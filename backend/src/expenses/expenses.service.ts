import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) {}

  async findAll(query: { page?: number; limit?: number; category?: string; startDate?: string; endDate?: string }) {
    const { page = 1, limit = 10, category, startDate, endDate } = query;
    const where: any = {};

    if (category) where.category = category;
    if (startDate && endDate) {
      where.expense_date = Between(new Date(startDate), new Date(endDate));
    }

    const [data, total] = await this.expensesRepository.findAndCount({
      where,
      order: { expense_date: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    const expense = await this.expensesRepository.findOne({ where: { id } });
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  async create(dto: CreateExpenseDto, userId?: number) {
    const totalAmount = (dto.quantity || 1) * dto.unit_price;
    const expense = this.expensesRepository.create({
      ...dto,
      total_amount: totalAmount,
      expense_date: dto.expense_date ? new Date(dto.expense_date) : new Date(),
      created_by: userId,
    });
    return this.expensesRepository.save(expense);
  }

  async update(id: number, dto: UpdateExpenseDto, userId?: number) {
    const expense = await this.expensesRepository.findOne({ where: { id } });
    if (!expense) throw new NotFoundException('Expense not found');

    Object.assign(expense, dto);

    const qty = dto.quantity ?? expense.quantity;
    const price = dto.unit_price ?? expense.unit_price;
    expense.total_amount = qty * price;
    expense.updated_by = userId;

    return this.expensesRepository.save(expense);
  }

  async remove(id: number) {
    const expense = await this.expensesRepository.findOne({ where: { id } });
    if (!expense) throw new NotFoundException('Expense not found');
    await this.expensesRepository.softDelete(id);
    return { message: 'Expense deleted successfully' };
  }

  async getCategories() {
    const expenses = await this.expensesRepository.find();
    const map = new Map<string, number>();
    for (const e of expenses) {
      map.set(e.category, (map.get(e.category) || 0) + Number(e.total_amount));
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }
}
