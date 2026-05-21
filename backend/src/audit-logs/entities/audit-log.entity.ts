import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user: number;

  @Column()
  action: string;

  @Column()
  module: string;

  @Column({ type: 'json', nullable: true, name: 'old_data' })
  old_data: any;

  @Column({ type: 'json', nullable: true, name: 'new_data' })
  new_data: any;

  @Column({ nullable: true })
  ip: string;

  @Column({ name: 'user_agent', nullable: true })
  user_agent: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
