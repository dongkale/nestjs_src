import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

interface Product {
  id: number;
  name: string;
  thumbnail: string;
  brand: { id: number; name: string };
  prices: Price[];
  labels: string[];
}

@Exclude()
export class ProductListResponse {
  @ApiProperty({
    description: '제품 리스트',
    example: [
      {
        id: 1,
        name: '제품 1',
        thumbnail: '',
        brand: { id: 1, name: 'brand 1' },
        prices: [
          {
            type: 'now',
            discountPrice: 9000,
            discountInstallmentPrice: 900,
            discountRate: 10,
            cardDiscountInstallmentPrice: 0,
          },
        ],
        labels: ['new', 'best'],
      },
    ],
  })
  @Expose()
  @IsArray()
  products: Product[];
}

type Price = {
  type: string | number;
  discountPrice: number;
  discountInstallmentPrice: number;
  discountRate: number;
  cardDiscountInstallmentPrice: number;
};
