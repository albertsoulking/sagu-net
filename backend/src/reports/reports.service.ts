import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { Expense } from '../expenses/entities/expense.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) {}

  async getRevenueReport(startDate?: string, endDate?: string) {
    const where: any = { payment_status: 'paid' };
    if (startDate && endDate) {
      where.created_at = Between(new Date(startDate), new Date(endDate));
    }

    const subscriptions = await this.subscriptionsRepository.find({
      where,
      relations: { user: true, package: true },
      order: { created_at: 'DESC' },
    });

    const total = subscriptions.reduce((sum, s) => sum + Number(s.total_amount), 0);

    return {
      total,
      count: subscriptions.length,
      data: subscriptions.map((s) => ({
        id: s.id,
        user: s.user?.username,
        package: s.package?.name,
        amount: s.total_amount,
        date: s.created_at,
        payment_type: s.payment_type,
      })),
    };
  }

  async getExpenseReport(startDate?: string, endDate?: string) {
    const where: any = {};
    if (startDate && endDate) {
      where.expense_date = Between(new Date(startDate), new Date(endDate));
    }

    const expenses = await this.expensesRepository.find({
      where,
      order: { expense_date: 'DESC' },
    });

    const total = expenses.reduce((sum, e) => sum + Number(e.total_amount), 0);

    return {
      total,
      count: expenses.length,
      data: expenses,
    };
  }

  async getProfitReport(startDate?: string, endDate?: string) {
    const revenue = await this.getRevenueReport(startDate, endDate);
    const expense = await this.getExpenseReport(startDate, endDate);

    return {
      revenue: revenue.total,
      expense: expense.total,
      profit: revenue.total - expense.total,
      revenueCount: revenue.count,
      expenseCount: expense.count,
    };
  }
}
