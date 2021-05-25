import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report, Tenant } from './entities';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { TenantsResolver } from './tenants.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Tenant])],
  controllers: [TenantsController],
  providers: [TenantsResolver, TenantsService, TenantsResolver],
})
export class TenantsModule {}
