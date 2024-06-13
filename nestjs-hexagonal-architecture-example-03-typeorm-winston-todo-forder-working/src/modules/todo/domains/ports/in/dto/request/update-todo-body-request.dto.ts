import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTodoBodyRequest {
  @Expose()
  @IsOptional()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  @IsString()
  content: string;

  constructor() {}
}
