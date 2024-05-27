import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty()
  content?: string;

  @ApiProperty()
  isDone?: boolean;
}
