import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async findAll(userId?: number) {
    const where: any = {};
    if (userId) where.user_id = userId;
    return this.notificationsRepository.find({
      where,
      order: { created_at: 'DESC' },
      take: 50,
    });
  }

  async create(notification: Partial<Notification>) {
    return this.notificationsRepository.save(
      this.notificationsRepository.create(notification),
    );
  }

  async markAsRead(id: number) {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });
    if (notification) {
      notification.read = true;
      await this.notificationsRepository.save(notification);
    }
    return { message: 'Notification marked as read' };
  }

  async markAllAsRead(userId?: number) {
    const where: any = { read: false };
    if (userId) where.user_id = userId;
    await this.notificationsRepository.update(where, { read: true });
    return { message: 'All notifications marked as read' };
  }

  async getUnreadCount(userId?: number) {
    const where: any = { read: false };
    if (userId) where.user_id = userId;
    return this.notificationsRepository.count({ where });
  }
}
