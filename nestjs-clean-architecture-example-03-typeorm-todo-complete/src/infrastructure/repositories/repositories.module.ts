import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '@/infrastructure/config/typeorm/typeorm.module';
import { Todo } from '@/infrastructure/entities/todo.entity';
import { DatabaseTodoRepository } from './todo.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Todo])],
  providers: [DatabaseTodoRepository],
  exports: [DatabaseTodoRepository],
})
export class RepositoriesModule {}
