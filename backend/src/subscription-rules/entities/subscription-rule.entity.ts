import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('subscription_rules')
export class SubscriptionRule extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'int', name: 'min_months', default: 1 })
  min_months: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'discount_percent', default: 0 })
  discount_percent: number;

  @Column({ name: 'extra_months', default: 0 })
  extra_months: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'active' })
  status: string;
}
