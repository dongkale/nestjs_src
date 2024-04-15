import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

interface Brand {
  id: number;
  thumbnail: string;
  locales: { [key: string]: string };
}

@Exclude()
export class BrandListResponse {
  @ApiProperty({
    description: '브랜드 리스트',
    example: [
      {
        id: 1,
        thumbnail: 'https://example.com',
        locales: {
          kr: '브랜드 1',
          en: 'brand 1',
        },
      },
    ],
  })
  @Expose()
  @IsArray()
  brands: Brand[];
}
