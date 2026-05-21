import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstallationRule } from './entities/installation-rule.entity';

@Injectable()
export class InstallationRulesService {
  constructor(
    @InjectRepository(InstallationRule)
    private rulesRepository: Repository<InstallationRule>,
  ) {}

  async findAll() {
    return this.rulesRepository.find({ order: { created_at: 'DESC' } });
  }

  async create(dto: Partial<InstallationRule>, userId?: number) {
    const rule = this.rulesRepository.create({ ...dto, created_by: userId });
    return this.rulesRepository.save(rule);
  }

  async update(id: number, dto: Partial<InstallationRule>, userId?: number) {
    const rule = await this.rulesRepository.findOne({ where: { id } });
    if (!rule) throw new NotFoundException('Rule not found');
    Object.assign(rule, { ...dto, updated_by: userId });
    return this.rulesRepository.save(rule);
  }

  async remove(id: number) {
    await this.rulesRepository.softDelete(id);
    return { message: 'Installation rule deleted' };
  }
}
