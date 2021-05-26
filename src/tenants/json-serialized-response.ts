import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

class MetaData {
  @ApiProperty()
  recordCount: number;
}
export class JSONSerializedList<TData> {
  @ApiProperty()
  meta: MetaData;

  data: TData[];
}

export const JSONSerializedListResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `JSONSerializedListOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(JSONSerializedList) },
          {
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: `${model.name.toLowerCase()}s`,
                    },
                    id: { type: 'string', format: 'uuid' },
                    attributes: {
                      $ref: getSchemaPath(model),
                    },
                    relationships: {
                      type: 'object',
                    },
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};
