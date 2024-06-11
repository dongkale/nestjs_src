import { Module } from '@nestjs/common';
import { TodoController } from '@/modules/todo/controller/todo.controller';
import { TodoService } from '@/modules/todo/service/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTodoRepository } from '@/modules/todo/outbound-adapter/typeorm/typeorm-todo.repository';
import { TodoEntity } from '@/modules/todo/outbound-adapter/typeorm/todo.entity';
import { ITodoRepository } from '@/modules/todo/outbound-port/todo.repository.interface';
import { ITodoService } from '@/modules/todo/inbound-port/todo.service.interface';

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
})
export class TodoModule {}
