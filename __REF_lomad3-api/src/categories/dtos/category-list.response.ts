import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

interface Category {
  id: number;
  name: string;
  children: Category[];
}

@Exclude()
export class CategoryListResponse {
  @ApiProperty({
    description: '카테고리 리스트',
    example: [
      {
        id: 1,
        name: '카테고리 1',
        children: [
          {
            id: 2,
            name: '카테고리 2',
            children: [
              {
                id: 3,
                name: '카테고리 3',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  })
  @Expose()
  @IsArray()
  categories: Category[];
}
