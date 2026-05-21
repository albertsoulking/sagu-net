import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('regions')
export class Region extends BaseEntity {
  @Column({ name: 'village_name' })
  village_name: string;

  @Column({ name: 'myanmar_name', nullable: true })
  myanmar_name: string;

  @Column({ nullable: true })
  township: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'coverage_radius', nullable: true })
  coverage_radius: number;

  @Column({ name: 'active_users', default: 0 })
  active_users: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  revenue: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'coverage_percent', default: 0 })
  coverage_percent: number;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => User, (user) => user.region)
  users: User[];
}
