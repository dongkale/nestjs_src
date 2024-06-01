import { Module } from '@nestjs/common';
import { TodoController } from '@/modules/todo/adapter/driving/todo.controller';
import { TodoService } from '@/modules/todo/domain/inboundPorts/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTodoRepository } from '@/modules/todo/adapter/driven/typeorm/typeorm-todo.repository';
import { TodoEntity } from '@/modules/todo/adapter/driven/typeorm/todo.entity';
import { ITodoRepository } from '@/modules/todo/domain/outboundPorts/todo.repository.interface';
import { ITodoService } from '@/modules/todo/domain/inboundPorts/todo.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [
    // TodoService,
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
