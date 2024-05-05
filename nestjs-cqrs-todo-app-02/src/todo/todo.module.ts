import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ToDoController } from './todo.controller';
import { CreateToDoHandler } from './create-todo-command-handler';
import { GetToDoQueryHandler } from './get-todo-query-handler';

@Module({
  imports: [CqrsModule],
  controllers: [ToDoController],
  providers: [CreateToDoHandler, GetToDoQueryHandler],
})
export class ToDoModule {}
