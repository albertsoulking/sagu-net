import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Region } from '../../regions/entities/region.entity';
import { Package } from '../../packages/entities/package.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  EXPIRED = 'expired',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'customer_id', unique: true, nullable: true })
  customer_id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  village: string;

  @Column({ nullable: true })
  township: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ name: 'region_id', nullable: true })
  region_id: number;

  @Column({ name: 'package_id', nullable: true })
  package_id: number;

  @Column({ name: 'onu_mac', nullable: true })
  onu_mac: string;

  @Column({ name: 'onu_serial', nullable: true })
  onu_serial: string;

  @Column({ name: 'onu_type', nullable: true })
  onu_type: string;

  @Column({ name: 'port_number', nullable: true })
  port_number: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cable_distance: number;

  @Column({ name: 'installation_type', nullable: true })
  installation_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  installation_fee: number;

  @Column({ name: 'subscription_start_date', type: 'date', nullable: true })
  subscription_start_date: Date;

  @Column({ name: 'subscription_end_date', type: 'date', nullable: true })
  subscription_end_date: Date;

  @Column({ name: 'remaining_days', default: 0 })
  remaining_days: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ name: 'last_payment_date', type: 'date', nullable: true })
  last_payment_date: Date;

  @Column({ name: 'last_online_at', type: 'timestamp', nullable: true })
  last_online_at: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: 'admin' })
  role: string;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
