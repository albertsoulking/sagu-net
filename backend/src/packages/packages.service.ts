import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packagesRepository: Repository<Package>,
  ) {}

  async findAll() {
    return this.packagesRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number) {
    const pkg = await this.packagesRepository.findOne({ where: { id } });
    if (!pkg) throw new NotFoundException('Package not found');
    return pkg;
  }

  async create(dto: CreatePackageDto, userId?: number) {
    const pkg = this.packagesRepository.create({
      ...dto,
      created_by: userId,
    });
    return this.packagesRepository.save(pkg);
  }

  async update(id: number, dto: UpdatePackageDto, userId?: number) {
    const pkg = await this.packagesRepository.findOne({ where: { id } });
    if (!pkg) throw new NotFoundException('Package not found');
    Object.assign(pkg, { ...dto, updated_by: userId });
    return this.packagesRepository.save(pkg);
  }

  async remove(id: number) {
    const pkg = await this.packagesRepository.findOne({ where: { id } });
    if (!pkg) throw new NotFoundException('Package not found');
    await this.packagesRepository.softDelete(id);
    return { message: 'Package deleted successfully' };
  }
}
