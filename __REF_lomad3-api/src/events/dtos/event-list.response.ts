import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

interface Event {
  id: number;
  thumbnail: string;
  startedAt: Date;
  endedAt: Date;
  label: string;
}

@Exclude()
export class EventListResponse {
  @ApiProperty({
    description: '이벤트 리스트',
    example: [
      {
        id: 1,
        thumbnail: 'https://example.com',
        startedAt: new Date(),
        endedAt: new Date(),
        label: '진행중',
      },
    ],
  })
  @Expose()
  @IsArray()
  events: Event[];
}
