import { Module } from '@nestjs/common';
import { TodoController } from '@/modules/todo-web/todo.controller';

@Module({
  controllers: [TodoController],
})
export class TodoWebModule {}
