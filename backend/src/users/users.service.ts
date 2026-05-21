import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserStatus } from './entities/user.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { RenewSubscriptionDto } from './dto/renew-subscription.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async findAll(query: QueryUserDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      status,
      region_id,
      package_id,
    } = query;

    const where: FindOptionsWhere<User> = {};

    if (status) where.status = status;
    if (region_id) where.region_id = Number(region_id);
    if (package_id) where.package_id = Number(package_id);

    if (search) {
      where.username = Like(`%${search}%`);
    }

    const [data, total] = await this.usersRepository.findAndCount({
      where,
      relations: { region: true, package: true },
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });

    const sanitized = data.map(({ password, ...rest }) => rest);

    return {
      data: sanitized,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { region: true, package: true, subscriptions: true },
    });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...result } = user;
    return result;
  }

  async create(createUserDto: CreateUserDto, userId?: number) {
    const existing = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existing) throw new ConflictException('Username already exists');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      created_by: userId,
    });
    const saved = await this.usersRepository.save(user);
    const { password, ...result } = saved;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto, userId?: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, { ...updateUserDto, updated_by: userId });
    const saved = await this.usersRepository.save(user);
    const { password, ...result } = saved;
    return result;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.softDelete(id);
    return { message: 'User deleted successfully' };
  }

  async suspend(id: number, userId?: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.status = UserStatus.SUSPENDED;
    user.updated_by = userId;
    await this.usersRepository.save(user);
    return { message: 'User suspended successfully' };
  }

  async activate(id: number, userId?: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.status = UserStatus.ACTIVE;
    user.updated_by = userId;
    await this.usersRepository.save(user);
    return { message: 'User activated successfully' };
  }

  async renew(id: number, dto: RenewSubscriptionDto, userId?: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const startDate = dto.start_date
      ? new Date(dto.start_date)
      : user.subscription_end_date
        ? new Date(user.subscription_end_date)
        : new Date();

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + dto.months + (dto.extra_months || 0));

    const basePrice = dto.total_amount || 0;
    const discountAmount = basePrice * ((dto.discount_percent || 0) / 100);
    const totalAmount = basePrice - discountAmount + (dto.installation_fee || 0) + (dto.cable_fee || 0);

    const subscription = this.subscriptionsRepository.create({
      user_id: id,
      package_id: dto.package_id,
      payment_type: dto.payment_type || 'cash',
      months: dto.months,
      discount_percent: dto.discount_percent || 0,
      extra_months: dto.extra_months || 0,
      installation_fee: dto.installation_fee || 0,
      cable_fee: dto.cable_fee || 0,
      total_amount: totalAmount,
      start_date: startDate,
      end_date: endDate,
      payment_status: 'paid',
      created_by: userId,
    });
    await this.subscriptionsRepository.save(subscription);

    user.subscription_start_date = startDate;
    user.subscription_end_date = endDate;
    user.last_payment_date = new Date();
    user.status = UserStatus.ACTIVE;
    user.package_id = dto.package_id;
    user.updated_by = userId;
    await this.usersRepository.save(user);

    return { message: 'Subscription renewed successfully', subscription };
  }

  async export(query: QueryUserDto) {
    const users = await this.usersRepository.find({
      where: {},
      relations: { region: true, package: true },
    });
    return users.map(({ password, ...rest }) => rest);
  }
}
