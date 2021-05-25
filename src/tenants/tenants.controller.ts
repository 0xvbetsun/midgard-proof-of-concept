import { Controller, Get } from '@nestjs/common';
import { Tenant } from './entities';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('/tenants')
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.find();
  }
}
