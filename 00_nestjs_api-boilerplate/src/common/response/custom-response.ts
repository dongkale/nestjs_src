import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { CustomResponseDto } from './custom-response.dto';

export const ApiOkCustomResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(CustomResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CustomResponseDto) },
          {
            properties: {
              resultCode: {
                type: 'number',
                example: 0,
                description: '성공/실패: 성공:0, 실패:에러코드(>0)',
              },
              resultMessage: {
                type: 'string',
                example: 'Success',
                description:
                  '성공/실패 메세지: 성공: Success, 실패: 실패 메세지',
              },
              resultData: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
