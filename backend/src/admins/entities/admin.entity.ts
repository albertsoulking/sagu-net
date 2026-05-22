import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  TECHNICIAN = 'technician',
  FINANCE = 'finance',
  EMPLOYEE = 'employee',
}

@Entity('admins')
export class Admin extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.ADMIN,
  })
  role: AdminRole;

  @Column({ name: 'is_active', default: true })
  is_active: boolean;
}
