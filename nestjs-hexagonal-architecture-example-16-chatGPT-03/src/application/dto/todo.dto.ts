import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  content: string;
}

export class UpdateTodoDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  isDone: boolean;
}
