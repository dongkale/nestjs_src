import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  isDone: boolean;
}
