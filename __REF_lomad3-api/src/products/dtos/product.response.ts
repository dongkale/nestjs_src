import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

import { Price, ProductDto } from './product.dto';

@Exclude()
export class ProductResponse extends ProductDto {
  @ApiProperty({ description: '이미지', example: ['https://example.com'] })
  @Expose()
  @IsArray()
  images: string[];

  @ApiProperty({ description: '태그', example: [{ id: 1, name: '태그 1' }] })
  @Expose()
  @IsArray()
  tags: Tag[];

  @ApiProperty({ description: '옵션' })
  @Expose()
  @IsArray()
  options: Option[];

  @ApiProperty({ description: '좋아요 수', example: 100 })
  @Expose()
  @IsNumber()
  likes: number;
}

type Tag = {
  id: number;
  name: string;
};

type Option = {
  id: number;
  name: string;
  prices: Price[];
  depth: number;
  option: number;
};
