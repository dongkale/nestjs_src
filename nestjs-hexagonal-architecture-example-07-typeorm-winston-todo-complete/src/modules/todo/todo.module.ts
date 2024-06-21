import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTodoController } from '@/todo/controller/create-todo.controller';
import { DeleteTodoController } from '@/todo/controller/delete-todo.controller';
import { GetTodoController } from '@/todo/controller/get-todo.controller';
import { GetTodosController } from '@/todo/controller/get-todos.controller';
import { UpdateTodoController } from '@/todo/controller/update-todo.controller';
import { TodoOrmEntity } from '@/todo/outbound-adapter/typeorm-entity/todo.typeorm-entity';
import { IFindTodosInboundPort } from '@/todo/inbound-port/find-todos.inbound-port.interface';
import { FindTodosService } from '@/todo/service/find-todos.service';
import { IFindTodosOutboundPort } from '@/todo/outbound-port/find-todos.outbound-port.interface';
import { FindTodosRepository } from '@/todo/outbound-adapter/find-todos.repository';
import { IFindTodoInboundPort } from '@/todo/inbound-port/find-todo.inbound-port.interface';
import { FindTodoService } from '@/todo/service/find-todo.service';
import { IFindTodoOutboundPort } from '@/todo/outbound-port/find-todo.outbound-port.interface';
import { FindTodoRepository } from '@/todo/outbound-adapter/find-todo.repository';
import { ICreateTodoInboundPort } from '@/todo/inbound-port/create-todo.inbound-port.interface';
import { CreateTodoService } from '@/todo/service/create-todo.service';
import { ICreateTodoOutboundPort } from '@/todo/outbound-port/create-todo.outbound-port.interface';
import { CreateTodoRepository } from '@/todo/outbound-adapter/create-todo.repository';
import { IUpdateTodoInboundPort } from '@/todo/inbound-port/update-todo.inbound-port.interface';
import { UpdateTodoService } from '@/todo/service/update-todo.service';
import { IUpdateTodoOutboundPort } from '@/todo/outbound-port/update-todo.outbound-port.interface';
import { UpdateTodoRepository } from '@/todo/outbound-adapter/update-todo.repository';
import { IDeleteTodoInboundPort } from '@/todo/inbound-port/delete-todo.inbound-port.interface';
import { DeleteTodoService } from '@/todo/service/delete-todo.service';
import { IDeleteTodoOutboundPort } from '@/todo/outbound-port/delete-todo.outbound-port.interface';
import { DeleteTodoRepository } from '@/todo/outbound-adapter/delete-todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoOrmEntity])],
  controllers: [
    CreateTodoController,
    DeleteTodoController,
    GetTodoController,
    GetTodosController,
    UpdateTodoController,
  ],
  providers: [
    {
      provide: IFindTodosInboundPort,
      useClass: FindTodosService,
    },
    {
      provide: IFindTodosOutboundPort,
      useClass: FindTodosRepository,
    },
    {
      provide: IFindTodoInboundPort,
      useClass: FindTodoService,
    },
    {
      provide: IFindTodoOutboundPort,
      useClass: FindTodoRepository,
    },
    {
      provide: ICreateTodoInboundPort,
      useClass: CreateTodoService,
    },
    {
      provide: ICreateTodoOutboundPort,
      useClass: CreateTodoRepository,
    },
    {
      provide: IUpdateTodoInboundPort,
      useClass: UpdateTodoService,
    },
    {
      provide: IUpdateTodoOutboundPort,
      useClass: UpdateTodoRepository,
    },
    {
      provide: IDeleteTodoInboundPort,
      useClass: DeleteTodoService,
    },
    {
      provide: IDeleteTodoOutboundPort,
      useClass: DeleteTodoRepository,
    },
  ],
})
export class TodoModule {}
