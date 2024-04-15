import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

@Exclude()
export class MyOrderDetailResponse {
  @ApiProperty({ description: '주문 ID', example: 1 })
  @Expose()
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: '제품 이름', example: '제품 1' })
  @Expose()
  @IsString()
  productName: string;

  @ApiProperty({
    description: '제품 옵션',
    example: [{ depth: 1, option: 'black' }],
  })
  @Expose()
  @IsArray()
  options: Option[];

  @ApiProperty({ description: '총 가격', example: 10000 })
  @Expose()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ description: '주문 상태', example: 1 })
  @Expose()
  @IsNumber()
  status: number;

  @ApiProperty({ description: '주문 날짜', example: '2021-01-01' })
  @Expose()
  @IsString()
  contractDate: string;

  @ApiProperty({ description: '주문자 이름', example: '유저 1' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({
    description: '주문자 주소',
    example: {
      zipCode: '12345',
      address: '서울시 강남구',
      detailAddress: '역삼동',
    },
  })
  @Expose()
  @IsObject()
  address: Address;

  @ApiProperty({ description: '주문자 연락처', example: '010-1234-5678' })
  @Expose()
  @IsString()
  phone: string;

  @ApiProperty({ description: '할인된 금액', example: 1000 })
  @Expose()
  @IsNumber()
  discountAmount: number;

  @ApiProperty({ description: '할인 전 금액', example: 10000 })
  @Expose()
  @IsNumber()
  beforeDiscountAmount: number;

  @ApiProperty({ description: '카드사 이름', example: 'hana' })
  @Expose()
  @IsString()
  cardName: string;

  @ApiProperty({ description: '개월 수', example: 12 })
  @Expose()
  @IsNumber()
  installment: number;
}

type Option = {
  depth: number;
  option: string;
};

type Address = {
  zipCode: string;
  address: string;
  detailAddress: string;
};
