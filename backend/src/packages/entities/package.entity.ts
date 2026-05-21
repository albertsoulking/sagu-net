import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('packages')
export class Package extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  speed: string;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'base_price' })
  base_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'installation_fee', default: 0 })
  installation_fee: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.package)
  users: User[];
}
