import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';
import { Contract } from '../entities';
import { ContractsService } from '../services';
import {
  JSONSerializedListResponse,
  JSONSerializedList,
} from '../json-serialized-response';
import { Query } from '@nestjs/common';

@Controller('contracts')
@ApiExtraModels(JSONSerializedList)
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  @JSONSerializedListResponse(Contract)
  async find(
    @Query('includes') includes,
  ): Promise<JSONSerializedList<Contract>> {
    const [contracts, recordCount] = await this.contractsService.findAndCount(
      includes,
    );

    return this.serializeList(contracts, recordCount);
  }

  private serializeList(contracts: Contract[], recordCount: number) {
    return new JSONAPISerializer('contracts', {
      attributes: [
        'activeEmployeesIncluded',
        'quarterlyFeePerExtraEmployee',
        'activeFrom',
        'tenant',
        'createdAt',
        'updatedAt',
      ],
      // @ts-expect-error for relationships
      tenant: {
        ref: 'id',
        included: true,
      },
      keyForAttribute: 'camelCase',
      dataLinks: {
        self: (contract: Contract) =>
          `http://localhost:3000/api/v1/contracts/${contract.id}`,
      },
      meta: {
        recordCount,
      },
    }).serialize(contracts);
  }
}
