import { Module } from '@nestjs/common';
import { TodoController } from '@/modules/todo/adapter/driving/todo.controller';
import { TodoService } from '@/modules/todo/domain/inboundPorts/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTodoRepository } from '@/modules/todo/adapter/driven/typeorm/typeorm-todo.repository';
import { TodoEntity } from '@/modules/todo/adapter/driven/typeorm/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: 'ITodoRepository',
      useClass: TypeOrmTodoRepository,
    },
  ],
})
export class TodoModule {}
