import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from '../../users/entities/user.entity';
import { Package } from '../../packages/entities/package.entity';

@Entity('subscriptions')
export class Subscription extends BaseEntity {
  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'package_id' })
  package_id: number;

  @Column({ name: 'payment_type' })
  payment_type: string;

  @Column({ default: 1 })
  months: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'discount_percent', default: 0 })
  discount_percent: number;

  @Column({ name: 'extra_months', default: 0 })
  extra_months: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'installation_fee', default: 0 })
  installation_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cable_fee', default: 0 })
  cable_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_amount' })
  total_amount: number;

  @Column({ name: 'start_date', type: 'date' })
  start_date: Date;

  @Column({ name: 'end_date', type: 'date' })
  end_date: Date;

  @Column({ name: 'payment_status', default: 'paid' })
  payment_status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package: Package;
}
