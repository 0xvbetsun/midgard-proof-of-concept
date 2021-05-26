import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
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
@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer', { name: 'active_employees_included', nullable: true })
  activeEmployeesIncluded: number | null;

  @Column('numeric', {
    name: 'quarterly_fee_per_extra_employee',
    nullable: true,
  })
  quarterlyFeePerExtraEmployee: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column('date', { name: 'active_from', nullable: true })
  activeFrom: Date | null;

  @ManyToOne(() => Tenant, (tenant) => tenant.contracts)
  @JoinColumn([{ name: 'tenant_id', referencedColumnName: 'id' }])
  @ApiProperty({ type: () => Tenant })
  tenant: Tenant;
}
