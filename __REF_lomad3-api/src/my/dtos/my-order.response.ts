import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

interface Order {
  orderId: number;
  productName: string;
  options: Option[];
  totalPrice: number;
  status: string;
  contractDate: string;
}

@Exclude()
export class MyOrderResponse {
  @ApiProperty({
    description: '주문 리스트',
    example: [
      {
        orderId: 1,
        productName: 'test',
        options: [
          { depth: 1, option: 'black' },
          { depth: 2, option: 'white' },
        ],
        totalPrice: 10000,
        status: 1,
        contractDate: '2021-01-01',
      },
    ],
  })
  @Expose()
  @IsArray()
  orders: Order[];
}

type Option = {
  depth: number;
  option: string;
};
