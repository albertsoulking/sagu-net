import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('employees')
export class Employee extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  position: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'overtime_rate', default: 0 })
  overtime_rate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'absent_deduction', default: 0 })
  absent_deduction: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bonus: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'advance_salary', default: 0 })
  advance_salary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'payable_salary', default: 0 })
  payable_salary: number;

  @Column({ name: 'attendance_days', default: 0 })
  attendance_days: number;
}
