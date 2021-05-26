import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contract } from './contract.entity';
import { Report } from './report.entity';

@ObjectType()
@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { nullable: true })
  name: string | null;

  // @example 'USD'
  @Column('character varying', {
    name: 'currency_code',
    length: 3,
    default: () => "'USD'",
  })
  currencyCode: string;

  @Column('text', { name: 'comment', nullable: true })
  comment: string | null;

  @Column('boolean', { name: 'is_live', default: () => false })
  isLive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Contract, (contract) => contract.tenant)
  @ApiProperty({ type: () => [Contract] })
  contracts: Contract[];

  @OneToMany(() => Report, (report) => report.tenant)
  reports: Report[];
}
