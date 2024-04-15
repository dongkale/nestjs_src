import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { MyDto } from './my.dto';

@Exclude()
export class MyResponse extends MyDto {
  @ApiProperty({ description: '유저 ID', example: 1 })
  @Expose()
  @IsNumber()
  id: number;

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
