import { ApiProperty } from '@nestjs/swagger';
import { TodoModel } from '@/domain/model/todo';

export class TodoPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(todo: TodoModel) {
    this.id = todo.id;
    this.content = todo.content;
    this.isDone = todo.isDone;
    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
  }
}
