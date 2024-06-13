/* eslint-disable @typescript-eslint/no-empty-function */
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoBodyRequest {
  @ApiProperty({ description: '제목' })
  @Expose()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ description: '내용' })
  @Expose()
  @IsOptional()
  @IsString()
  content: string;

  constructor() {}
}
