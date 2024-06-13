import { Module } from '@nestjs/common';
import { TodoController } from '@/todo/adaptor/in-web/todo.controller';

@Module({
  controllers: [TodoController],
})
export class TodoWebModule {}
