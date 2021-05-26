import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract, Report, Tenant } from './entities';
import { ContractsController, TenantsController } from './controllers';
import { ContractsService, TenantsService } from './services';
import { TenantsResolver } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Report, Tenant])],
  controllers: [ContractsController, TenantsController],
  providers: [ContractsService, TenantsResolver, TenantsService],
})
export class TenantsModule {}
