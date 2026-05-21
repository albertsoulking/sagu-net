import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { User, UserStatus } from '../users/entities/user.entity';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const regions = await this.regionsRepository.find({
      order: { created_at: 'DESC' },
    });

    for (const region of regions) {
      const activeUsers = await this.usersRepository.count({
        where: { region_id: region.id, status: UserStatus.ACTIVE as any },
      });
      region.active_users = activeUsers;
    }

    return regions;
  }

  async findOne(id: number) {
    const region = await this.regionsRepository.findOne({ where: { id } });
    if (!region) throw new NotFoundException('Region not found');

    const activeUsers = await this.usersRepository.count({
      where: { region_id: id, status: UserStatus.ACTIVE as any },
    });
    region.active_users = activeUsers;

    return region;
  }

  async create(dto: CreateRegionDto, userId?: number) {
    const region = this.regionsRepository.create({
      ...dto,
      created_by: userId,
    });
    return this.regionsRepository.save(region);
  }

  async update(id: number, dto: UpdateRegionDto, userId?: number) {
    const region = await this.regionsRepository.findOne({ where: { id } });
    if (!region) throw new NotFoundException('Region not found');
    Object.assign(region, { ...dto, updated_by: userId });
    return this.regionsRepository.save(region);
  }

  async remove(id: number) {
    const region = await this.regionsRepository.findOne({ where: { id } });
    if (!region) throw new NotFoundException('Region not found');
    await this.regionsRepository.softDelete(id);
    return { message: 'Region deleted successfully' };
  }

  async getMapMarkers() {
    const regions = await this.regionsRepository.find({
      where: { status: 'active' },
    });
    return regions.map((r) => ({
      id: r.id,
      name: r.village_name,
      lat: r.latitude,
      lng: r.longitude,
      active_users: r.active_users,
      coverage_percent: r.coverage_percent,
    }));
  }

  async getAnalytics() {
    const regions = await this.regionsRepository.find();
    const totalUsers = await this.usersRepository.count();
    const activeUsers = await this.usersRepository.count({
      where: { status: UserStatus.ACTIVE as any },
    });

    return {
      regions: regions.map((r) => ({
        name: r.village_name,
        users: r.active_users,
        revenue: r.revenue,
      })),
      totalUsers,
      activeUsers,
      totalRegions: regions.length,
    };
  }
}
