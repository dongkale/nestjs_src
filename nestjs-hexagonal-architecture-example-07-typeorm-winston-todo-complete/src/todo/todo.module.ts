import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { GetMembersController } from '@/__member/controller/get-member.controller';
// import { IFindMembersInboundPort } from '@/__member/inbound-port/find-members.inbound-port.interface';
// import { FindMembersRepository } from '@/__member/outbound-adapter/find-members.repository';
// import { IFindMembersOutboundPort } from '@/__member/outbound-port/find-members.outbound-port.interface';
// import { FindMembersService } from '@/__member/service/find-members.service';
// import { MemberEntity } from '@/__member/models/member.entity';
// import { GreateMemberController } from './controller/create-member.controller';
// import { ICreateMemberInboundPort } from './inbound-port/create-member.inbound-port.interface';
// import { CreateMemberService } from './service/create-member.service';
// import { ICreateMemberOutboundPort } from './outbound-port/create-member.outbound-port.interface';
// import { CreateMemberRepository } from './outbound-adapter/create-member.repository';
import { GetTodoController } from '@/todo/controller/get-todo.controller';
import { GetTodosController } from '@/todo/controller/get-todos.controller';
import { CreateTodoController } from '@/todo/controller/create-todo.controller';
import { UpdateTodoController } from '@/todo/controller/update-todo.controller';
import { DeleteTodoController } from '@/todo/controller/delete-todo.controller';
import { TodoOrmEntity } from '@/todo/outbound-adapter/todo.typeorm-entity';
import { IFindTodosInboundPort } from '@/todo/inbound-port/find-todos.inbound-port.interface';
import { FindTodosService } from '@/todo/service/find-todos.service';
import { IFindTodosOutboundPort } from '@/todo/outbound-port/find-todos.outbound-port.interface';
import { FindTodosRepository } from '@/todo/outbound-adapter/find-todos.repository';
import { IFindTodoInboundPort } from '@/todo/inbound-port/find-todo.inbound-port.interface';
import { FindTodoService } from '@/todo/service/find-todo.service';
import { IFindTodoOutboundPort } from '@/todo/outbound-port/find-todo.outbound-port.interface';
import { FindTodoRepository } from '@/todo/outbound-adapter/find-todo.repository';

// member 리스트를 조회하는 API를 작성해보자
@Module({
  imports: [TypeOrmModule.forFeature([TodoOrmEntity])],
  controllers: [
    GetTodoController,
    GetTodosController,
    CreateTodoController,
    DeleteTodoController,
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
    // {
    //   provide: ICreateMemberInboundPort,
    //   useClass: CreateMemberService,
    // },
    // {
    //   provide: ICreateMemberOutboundPort,
    //   useClass: CreateMemberRepository,
    // },
  ],
})
export class TodoModule {}
