import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('expenses')
export class Expense extends BaseEntity {
  @Column()
  category: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'unit_price' })
  unit_price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'total_amount' })
  total_amount: number;

  @Column({ name: 'payment_type', default: 'cash' })
  payment_type: string;

  @Column({ name: 'receipt_image', nullable: true })
  receipt_image: string;

  @Column({ name: 'expense_date', type: 'date' })
  expense_date: Date;
}
