import { ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Report } from './report.entity';

@ObjectType()
@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { nullable: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // @example 'USD'
  @Column('character varying', {
    name: 'currency_code',
    nullable: true,
    length: 3,
    default: () => 'USD',
  })
  currencyCode: string;

  @Column('text', { name: 'comment', nullable: true })
  comment: string;

  @Column('boolean', { name: 'is_live', default: () => false })
  isLive: boolean;

  @OneToMany(() => Report, (report) => report.tenant)
  reports: Report[];
}
