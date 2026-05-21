import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.subscriptionsRepository.findAndCount({
      relations: { user: true, package: true },
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    const sub = await this.subscriptionsRepository.findOne({
      where: { id },
      relations: { user: true, package: true },
    });
    if (!sub) throw new NotFoundException('Subscription not found');
    return sub;
  }

  async create(dto: CreateSubscriptionDto, userId?: number) {
    const startDate = dto.start_date ? new Date(dto.start_date) : new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + dto.months + (dto.extra_months || 0));

    const totalAmount =
      dto.total_amount ||
      (dto.months * 100 - (dto.months * 100 * (dto.discount_percent || 0)) / 100);

    const subscription = this.subscriptionsRepository.create({
      ...dto,
      start_date: startDate,
      end_date: endDate,
      total_amount: totalAmount,
      payment_status: 'paid',
      created_by: userId,
    });

    return this.subscriptionsRepository.save(subscription);
  }

  async findByUser(userId: number) {
    return this.subscriptionsRepository.find({
      where: { user_id: userId },
      relations: { package: true },
      order: { created_at: 'DESC' },
    });
  }
}
