import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('installation_rules')
export class InstallationRule extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fee: number;

  @Column({ name: 'free_distance', type: 'decimal', precision: 10, scale: 2, default: 0 })
  free_distance: number;

  @Column({ name: 'extra_meter_price', type: 'decimal', precision: 10, scale: 2, default: 0 })
  extra_meter_price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'active' })
  status: string;
}
