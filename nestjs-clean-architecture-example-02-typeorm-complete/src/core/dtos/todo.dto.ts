import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
