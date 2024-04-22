import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Exclude,
  Expose,
  Transform,
  Type,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { JsonStringCheck } from '../../common/decorators/json-string-check';
import { Part } from '../part.entity';

export class CreatePartDto {
  @IsString()
  @ApiProperty({ name: 'name', description: '이름', example: '이름 1' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'description', description: '설명', example: '설명 1' })
  description: string;

  @IsString()
  @IsNotEmpty()
  // @Transform(({ value }) => {
  //   const isValidDate = isISO8601(value, {
  //     strict: true,
  //     strictSeparator: true,
  //   });
  //   if (!isValidDate) {
  //     throw new Error(
  //       `Property "from_date" should be a valid ISO8601 date string`,
  //     );
  //   }
  //   return new Date(value);
  // })
  // @Transform(({ value, obj }) => {
  //   try {
  //     JSON.parse(value);
  //   } catch (e) {
  //     throw new BadRequestException(
  //       `${obj.dataJson.trim()} not json string format`,
  //     );
  //   }

  //   return value.trim();
  // })
  @JsonStringCheck()
  @ApiProperty({
    name: 'data_json',
    description: 'JSON 데이터',
    example: "{ number: 1, string: 'string_01' }",
  })
  dataJson: string;
}

export class UpdatePartDto {
  @IsString()
  @ApiProperty({ name: 'description', description: '설명', example: '설명 1' })
  description?: string;

  @IsString()
  @ApiProperty({
    name: 'data_json',
    description: 'JSON 데이터',
    example: "{ number: 1, string: 'string_01' }",
  })
  dataJson?: string;
}

@Exclude()
export class ResponsePartDto {
  static convertFromPart(items: Part[]): ResponsePartDto[] {
    return plainToInstance(ResponsePartDto, items, {
      excludeExtraneousValues: true,
    });
  }

  static convertFromPartEx(items: Part[]): ResponsePartDto[] {
    const response: ResponsePartDto[] = [];

    if (!Array.isArray(items)) {
      return [];
    }

    for (const part of items) {
      response.push({
        id: part.id,
        name: part.name,
        description: part.description,
        dataJson: part.dataJson,
      });
    }

    return response;
  }

  @ApiProperty({ description: 'ID', example: 1 })
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty({ description: '이름', example: '이름 1' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ description: '설명', example: '설명 1' })
  @Expose()
  @IsString()
  description: string;

  @ApiProperty({
    description: '데이터',
    example: "{ number: 1, string: 'string_01' }",
  })
  @Expose()
  @IsString()
  dataJson: string;
}
