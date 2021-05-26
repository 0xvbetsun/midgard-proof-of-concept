import { ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from './tenant.entity';

@ObjectType()
@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying')
  name: string;

  @Column('date', { name: 'from_date', nullable: true })
  fromDate: Date | null;

  @Column('date', { name: 'to_date', nullable: true })
  toDate: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.reports)
  @JoinColumn([{ name: 'tenant_id', referencedColumnName: 'id' }])
  tenant: Tenant;
}
