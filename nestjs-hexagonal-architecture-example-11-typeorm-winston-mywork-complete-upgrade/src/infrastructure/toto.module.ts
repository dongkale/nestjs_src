// src/infrastructure/adapters/persistence/typeorm/typeorm.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTodoRepository } from '@/infrastructure/adapters/persistence/typeorm/typeorm-todo.repository';
import { TodoEntity } from '@/infrastructure/adapters/persistence/typeorm/todo.entity';
import { ITodoRepository } from '@/core/interfaces/todo.repository.interface';
import { ITodoService } from '@/core/interfaces/todo.service.interface';
import { TodoService } from '@/application/services/todo.service';
import { TodoController } from '@/interface/controllers/todo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
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
  // exports: [ITodoRepository],
})
export class TodoModule {}
