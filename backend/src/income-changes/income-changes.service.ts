import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeChange } from './entities/income-change.entity';

@Injectable()
export class IncomeChangesService {
  constructor(
    @InjectRepository(IncomeChange)
    private incomeChangesRepository: Repository<IncomeChange>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.incomeChangesRepository.findAndCount({
      order: { change_date: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async create(dto: Partial<IncomeChange>, userId?: number) {
    const entry = this.incomeChangesRepository.create({
      ...dto,
      created_by: userId,
    });
    return this.incomeChangesRepository.save(entry);
  }

  async remove(id: number) {
    await this.incomeChangesRepository.softDelete(id);
    return { message: 'Income change deleted' };
  }
}
