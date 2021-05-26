import { Controller, Get } from '@nestjs/common';
import { Tenant } from '../entities';
import { TenantsService } from '../services';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.find();
  }
}
