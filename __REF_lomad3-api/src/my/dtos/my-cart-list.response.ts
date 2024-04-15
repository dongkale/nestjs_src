import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

interface Cart {
  id: number;
  type: string;
  productId: number;
  productName: string;
  thumbnail: string;
  options: Option[];
  installmentPeriod: number;
  deliveryFee: number;
  price: Price;
}

@Exclude()
export class MyCartListResponse {
  @ApiProperty({
    description: '장바구니 리스트',
    example: [
      {
        id: 1,
        type: 'bnpl',
        productId: 1,
        productName: 'test',
        thumbnail: 'test',
        options: [
          { depth: 1, option: 'black' },
          { depth: 2, option: 'white' },
        ],
        installmentPeriod: 12,
        deliveryFee: 2500,
        price: {
          originalPrice: 10000,
          discountPrice: 9000,
          originalInstallmentPrice: 1000,
          discountInstallmentPrice: 900,
          discountRate: 10,
        },
      },
    ],
  })
  @Expose()
  @IsArray()
  carts: Cart[];
}

type Option = {
  depth: number;
  option: string;
};

type Price = {
  originalPrice: number;
  discountPrice: number;
  originalInstallmentPrice: number;
  discountInstallmentPrice: number;
  discountRate: number;
};
