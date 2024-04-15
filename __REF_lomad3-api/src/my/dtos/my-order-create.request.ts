import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

@Exclude()
export class MyOrderCreateRequest {
  @ApiProperty({ description: '유저 이름', example: '유저 1' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ description: '유저 연락처', example: '01012345678' })
  @Expose()
  @IsString()
  phone: string;

  @ApiProperty({ description: '제품 ID', example: 1 })
  @Expose()
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: '제품 옵션',
    example: [
      { depth: 1, option: 'black' },
      { depth: 2, option: 'white' },
    ],
  })
  @Expose()
  @IsArray()
  options: Option[];

  @ApiProperty({ description: '개월 수', example: 1 })
  @Expose()
  @IsNumber()
  installmentPeriod: number;

  @ApiProperty({ description: '총 가격', example: 10000 })
  @Expose()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ description: '분납가격', example: 10000 })
  @Expose()
  @IsNumber()
  installmentPrice: number;

  @ApiProperty({ description: '수령자 이름', example: '유저 1' })
  @Expose()
  @IsString()
  recipient: string;

  @ApiProperty({ description: '수령자 연락처', example: '01012345678' })
  @Expose()
  @IsString()
  recipientPhone: string;

  @ApiProperty({
    description: '주문자 주소',
    example: {
      zipcode: '12345',
      address: '서울시 강남구',
      detailAddress: '역삼동',
    },
  })
  @Expose()
  @IsObject()
  address: Address;

  @ApiProperty({
    description: '카드 정보',
    example: {
      cardName: '신한카드',
      cardNumber: '1234123412341234',
      expiredAt: '01/01',
      password: 12,
    },
  })
  @Expose()
  @IsObject()
  card: Card;
}

type Option = {
  depth: number;
  option: string;
};

type Address = {
  zipcode: string;
  address: string;
  detailAddress: string;
};

type Card = {
  cardName: string;
  cardNumber: string;
  expiredAt: string;
  password: number;
};
