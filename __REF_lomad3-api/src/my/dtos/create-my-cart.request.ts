import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

@Exclude()
export class CreateMyCartRequest {
  @ApiProperty({ description: '제품 ID', example: 1 })
  @Expose()
  @IsString()
  productId: string;

  @ApiProperty({
    description: '제품 옵션',
    example: [{ depth: 1, option: 'white' }],
  })
  @Expose()
  @IsArray()
  options: Option[];

  @ApiProperty({ description: '개월 수', example: 1 })
  @Expose()
  @IsNumber()
  installmentPeriod: number;
}

type Option = {
  depth: number;
  option: string;
};
