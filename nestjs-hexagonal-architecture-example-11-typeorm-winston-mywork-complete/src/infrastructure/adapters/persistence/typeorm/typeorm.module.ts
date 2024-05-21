// src/infrastructure/adapters/persistence/typeorm/typeorm.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTodoRepository } from '@/infrastructure/adapters/persistence/typeorm/typeorm-todo.repository';
import { TodoEntity } from '@/infrastructure/adapters/persistence/typeorm/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [
    {
      provide: 'ITodoRepository',
      useClass: TypeOrmTodoRepository,
    },
  ],
  exports: ['ITodoRepository'],
})
export class TypeOrmTodoModule {}
