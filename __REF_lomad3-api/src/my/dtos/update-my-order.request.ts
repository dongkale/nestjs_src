import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsObject, IsString } from 'class-validator';

@Exclude()
export class UpdateMyOrderRequest {
  @ApiProperty({ description: '수령자 이름', example: '수령자 1' })
  @Expose()
  @IsString()
  recipient?: string;

  @ApiProperty({ description: '수령자 연락처', example: '01012345678' })
  @Expose()
  @IsString()
  recipientPhone?: string;

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
  address?: Address;

  @ApiProperty({
    description: '카드 정보',
    example: {
      cardName: 'hana',
      cardNumber: '1234123412341234',
      expiredAt: '01/01',
      password: 12,
    },
  })
  @Expose()
  @IsObject()
  card?: Card;
}

type Address = {
  zipCode: string;
  address: string;
  detailAddress: string;
};

type Card = {
  cardName: string;
  cardNumber: string;
  expiredAt: string;
  password: number;
};
