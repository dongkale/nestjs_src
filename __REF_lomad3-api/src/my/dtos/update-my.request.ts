import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

@Exclude()
export class UpdateMyRequest {
  @ApiProperty({ description: '유저 이름', example: '유저 1' })
  @Expose()
  @IsString()
  name?: string;

  @ApiProperty({ description: '유저 연락처', example: '010-1234-5678' })
  @Expose()
  @IsString()
  phone?: string;

  @ApiProperty({ description: '유저 성별', example: 1 })
  @Expose()
  @IsNumber()
  gender?: number;

  @ApiProperty({ description: '유저 생년월일', example: '1990-01-01' })
  @Expose()
  @IsString()
  birthday?: string;

  @ApiProperty({
    description: '유저 주소',
    example: {
      zipcode: 12345,
      address: '서울 서초구 바우뫼로 162',
      detailAddress: '4층',
    },
  })
  @Expose()
  @IsObject()
  address?: Address;

  @ApiProperty({ description: '광고 수신', example: true })
  @Expose()
  @IsBoolean()
  isReceiveAd?: boolean;

  @ApiProperty({ description: 'access token' })
  @Expose()
  @IsString()
  accessToken?: string;

  @ApiProperty({ description: 'refresh token' })
  @Expose()
  @IsString()
  refreshToken?: string;
}

type Address = {
  zipcode: number;
  address: string;
  detailAddress: string;
};
