// src/infrastructure/modules/todo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@/domain/entities/todo.entity';
import { TodoService } from '@/application/services/todo.service';
import { TypeOrmTodoRepository } from '@/infrastructure/repositories/typeorm-todo.repository';
import { TodoController } from '@/adapters/controllers/todo.controller';
import { ITodoRepository } from '@/domain/ports/itodo.repository';
import { ITodoService } from '@/application/interfaces/itodo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [
    {
      provide: ITodoService,
      useClass: TodoService,
    },
    {
      provide: ITodoRepository,
      useClass: TypeOrmTodoRepository,
    },
  ],
})
export class TodoModule {}
