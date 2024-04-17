import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiCommonResponse = (
  obj: SchemaObject & Partial<ReferenceObject>,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          result_code: {
            type: 'number',
            example: 0,
            description: '성공/실패: 성공:0, 실패:에러코드(>0)',
          },
          result_message: {
            type: 'string',
            example: 'Success',
            description: '성공/실패 메세지: 성공: Seccess, 실패: 실패 메세지',
          },
          result_data: {
            type: 'array',
            ...obj,
          },
        },
      },
    }),
  );
};
