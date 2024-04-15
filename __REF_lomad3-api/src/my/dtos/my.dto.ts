import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

@Exclude
export class MyDto {
  @ApiProperty({ description: '유저 이름', example: '유저 1' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ description: '유저 연락처', example: '010-1234-5678' })
  @Expose()
  @IsString()
  phone: string;

  @ApiProperty({ description: '유저 성별', example: 1 })
  @Expose()
  @IsNumber()
  gender: number;

  @ApiProperty({ description: '유저 생년월일', example: '1990-01-01' })
  @Expose()
  @IsString()
  birthday: string;

  @ApiProperty({ description: 'sns 타입', example: 'naver' })
  @Expose()
  @IsString()
  snsType: string;

  @ApiProperty({ description: '광고 수신', example: true })
  @Expose()
  @IsBoolean()
  isReceiveAd: boolean;
}
