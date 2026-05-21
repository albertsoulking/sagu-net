import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from '../users/entities/user.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { Expense } from '../expenses/entities/expense.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) {}

  async getSummary() {
    const totalUsers = await this.usersRepository.count();
    const activeUsers = await this.usersRepository.count({
      where: { status: UserStatus.ACTIVE } as any,
    });
    const expiredUsers = await this.usersRepository.count({
      where: { status: UserStatus.EXPIRED } as any,
    });
    const suspendedUsers = await this.usersRepository.count({
      where: { status: UserStatus.SUSPENDED } as any,
    });

    const revenueResult = await this.subscriptionsRepository
      .createQueryBuilder('s')
      .select('COALESCE(SUM(s.total_amount), 0)', 'total')
      .getRawOne();
    const revenue = Number(revenueResult?.total || 0);

    const expenseResult = await this.expensesRepository
      .createQueryBuilder('e')
      .select('COALESCE(SUM(e.total_amount), 0)', 'total')
      .getRawOne();
    const expense = Number(expenseResult?.total || 0);

    const todayRenewals = await this.subscriptionsRepository.count({
      where: {
        created_at: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });

    return {
      activeUsers,
      expiredUsers,
      suspendedUsers,
      totalUsers,
      revenue,
      expense,
      profit: revenue - expense,
      dailyRenewals: todayRenewals,
    };
  }

  async getCharts() {
    const monthlyRevenue = await this.subscriptionsRepository
      .createQueryBuilder('s')
      .select("DATE_FORMAT(s.created_at, '%Y-%m')", 'month')
      .addSelect('COALESCE(SUM(s.total_amount), 0)', 'revenue')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .limit(12)
      .getRawMany();

    const monthlyExpenses = await this.expensesRepository
      .createQueryBuilder('e')
      .select("DATE_FORMAT(e.expense_date, '%Y-%m')", 'month')
      .addSelect('COALESCE(SUM(e.total_amount), 0)', 'expense')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .limit(12)
      .getRawMany();

    const packageStats = await this.usersRepository
      .createQueryBuilder('u')
      .select('p.name', 'name')
      .addSelect('COUNT(u.id)', 'count')
      .leftJoin('u.package', 'p')
      .groupBy('p.name')
      .getRawMany();

    return {
      monthlyRevenue,
      monthlyExpenses,
      packageStats,
    };
  }

  async getRecentActivities(limit = 10) {
    const recentSubscriptions = await this.subscriptionsRepository.find({
      relations: { user: true, package: true },
      order: { created_at: 'DESC' },
      take: limit,
    });

    return recentSubscriptions.map((sub) => ({
      id: sub.id,
      type: 'renewal',
      user: sub.user?.username || 'N/A',
      package: sub.package?.name || 'N/A',
      amount: sub.total_amount,
      date: sub.created_at,
    }));
  }
}
