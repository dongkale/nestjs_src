import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class BrandResponse {
  @ApiProperty({ description: '브랜드 ID', example: 1 })
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty({ description: '브랜드 이름(한글)', example: '브랜드 1' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ description: '로고 이미지', example: 'https://example.com' })
  @Expose()
  @IsString()
  logo: string;

  @ApiProperty({ description: '브랜드 소개', example: '브랜드 소개' })
  @Expose()
  @IsString()
  summary: string;

  @ApiProperty({ description: '좋아요 수', example: 100 })
  @Expose()
  @IsNumber()
  likes: number;
}
