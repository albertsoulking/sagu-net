import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionRule } from './entities/subscription-rule.entity';

@Injectable()
export class SubscriptionRulesService {
  constructor(
    @InjectRepository(SubscriptionRule)
    private rulesRepository: Repository<SubscriptionRule>,
  ) {}

  async findAll() {
    return this.rulesRepository.find({ order: { created_at: 'DESC' } });
  }

  async create(dto: Partial<SubscriptionRule>, userId?: number) {
    const rule = new SubscriptionRule();
    Object.assign(rule, dto, { created_by: userId });
    return this.rulesRepository.save(rule);
  }

  async update(id: number, dto: Partial<SubscriptionRule>, userId?: number) {
    const rule = await this.rulesRepository.findOne({ where: { id } });
    if (!rule) throw new NotFoundException('Rule not found');
    Object.assign(rule, dto, { updated_by: userId });
    return this.rulesRepository.save(rule);
  }

  async remove(id: number) {
    await this.rulesRepository.softDelete(id);
    return { message: 'Subscription rule deleted' };
  }
}
