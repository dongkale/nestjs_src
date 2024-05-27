import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from '@/application/services/todo.service';
import { TodoController } from '@/infrastructure/controllers/todo.controller';
import { TodoRepository } from '@/core/repositories/todo.repository';
import { Todo } from '@/core/domain/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [
    TodoService,
    {
      provide: 'ITodoRepository',
      useClass: TodoRepository,
    },
  ],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}
