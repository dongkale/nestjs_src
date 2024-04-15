import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, IsObject, IsArray } from 'class-validator';

@Exclude()
export class ProductDto {
  @ApiProperty({ description: '제품 ID', example: 1 })
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty({ description: '제품 이름', example: '제품 1' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({
    description: '브랜드',
    example: { id: 1, name: 'brand 1' },
  })
  @Expose()
  @IsObject()
  brand: { id: number; name: string };

  @ApiProperty({ description: '가격' })
  @Expose()
  @IsArray()
  prices: Price[];
}

export type Price = {
  type: string | number;
  originalPrice: number;
  discountPrice: number;
  originalInstallmentPrice: number;
  discountInstallmentPrice: number;
  discountRate: number;
  cardDiscountInstallmentPrice: 0;
};
