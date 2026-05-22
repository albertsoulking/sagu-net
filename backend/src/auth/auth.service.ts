import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin, AdminRole } from '../admins/entities/admin.entity';
import { AuditLog } from '../audit-logs/entities/audit-log.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private refreshTokens: Map<string, { userId: number; expiresAt: Date }> =
    new Map();

  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
    @InjectDataSource()
    private dataSource: DataSource,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto, ip?: string, userAgent?: string) {
    let admin: Admin | null = null;
    try {
      admin = await this.adminRepository.findOne({
        where: { username: loginDto.username },
      });
    } catch {
      const tbl = await this.dataSource.query(
        `SELECT COUNT(*) as cnt FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'admins'`,
        [this.configService.get('database.name') || 'sagu_net_db'],
      );
      if (tbl[0]?.cnt === 0) {
        throw new UnauthorizedException('System not initialized. Please initialize first.');
      }
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      admin.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!admin.is_active) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const tokens = await this.generateTokens(admin);

    await this.auditLogRepository.save({
      user: admin.id,
      action: 'LOGIN',
      module: 'auth',
      ip,
      user_agent: userAgent,
    });

    return {
      user: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
      },
      ...tokens,
    };
  }

  async logout(userId: number, refreshToken?: string) {
    if (refreshToken) {
      this.refreshTokens.delete(refreshToken);
    }
    return { message: 'Logged out successfully' };
  }

  async refresh(refreshToken: string) {
    const stored = this.refreshTokens.get(refreshToken);
    if (!stored || stored.expiresAt < new Date()) {
      this.refreshTokens.delete(refreshToken);
      throw new UnauthorizedException('Invalid refresh token');
    }

    const admin = await this.adminRepository.findOne({
      where: { id: stored.userId },
    });
    if (!admin) {
      throw new UnauthorizedException('User not found');
    }

    this.refreshTokens.delete(refreshToken);
    return this.generateTokens(admin);
  }

  async getProfile(userId: number) {
    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });
    if (!admin) {
      throw new UnauthorizedException('User not found');
    }
    const { password, ...profile } = admin;
    return profile;
  }

  async checkInit() {
    try {
      const result = await this.dataSource.query(
        `SELECT COUNT(*) as cnt FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'admins'`,
        [this.configService.get('database.name') || 'sagu_net_db'],
      );
      if (result[0]?.cnt === 0) {
        return { initialized: false };
      }
      const count = await this.adminRepository.count();
      return { initialized: count > 0 };
    } catch {
      return { initialized: false };
    }
  }

  async init() {
    try {
      const result = await this.dataSource.query(
        `SELECT COUNT(*) as cnt FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'admins'`,
        [this.configService.get('database.name') || 'sagu_net_db'],
      );
      if (result[0]?.cnt === 0) {
        await this.dataSource.query(`
          CREATE TABLE admins (
            id INT NOT NULL AUTO_INCREMENT,
            created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            deleted_at TIMESTAMP(6) NULL,
            created_by INT NULL,
            updated_by INT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NULL,
            email VARCHAR(255) NULL,
            phone VARCHAR(255) NULL,
            role ENUM('super_admin','admin','manager','technician','finance','employee') NOT NULL DEFAULT 'admin',
            is_active TINYINT NOT NULL DEFAULT 1,
            UNIQUE INDEX IDX_username (username),
            PRIMARY KEY (id)
          ) ENGINE=InnoDB
        `);
      }
      const count = await this.adminRepository.count();
      if (count > 0) {
        throw new ConflictException('Already initialized');
      }
    } catch (e) {
      if (e instanceof ConflictException) throw e;
      throw new ConflictException('Failed to initialize: ' + (e as Error).message);
    }
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await this.adminRepository.save({
      username: 'admin',
      password: hashedPassword,
      name: 'Super Admin',
      email: 'admin@sagunet.com',
      phone: '09123456789',
      role: AdminRole.SUPER_ADMIN,
      is_active: true,
    });
    return { message: 'Default admin created: admin / admin123' };
  }

  async updateProfile(userId: number, dto: { username?: string; password?: string }) {
    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });
    if (!admin) {
      throw new UnauthorizedException('User not found');
    }

    if (dto.username && dto.username !== admin.username) {
      const existing = await this.adminRepository.findOne({
        where: { username: dto.username },
      });
      if (existing) {
        throw new ConflictException('Username already taken');
      }
      admin.username = dto.username;
    }

    if (dto.password) {
      admin.password = await bcrypt.hash(dto.password, 10);
    }

    await this.adminRepository.save(admin);
    const { password, ...profile } = admin;
    return profile;
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });
    if (!admin) {
      throw new UnauthorizedException('User not found');
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await this.adminRepository.save(admin);

    return { message: 'Password changed successfully' };
  }

  private async generateTokens(admin: Admin) {
    const payload = {
      sub: admin.id,
      username: admin.username,
      role: admin.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('app.jwtRefreshSecret'),
      expiresIn: this.configService.get('app.jwtRefreshExpiresIn'),
    });

    this.refreshTokens.set(refreshToken, {
      userId: admin.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }
}
