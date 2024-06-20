import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IFindTodosOutboundPort,
  FindTodosOutboundPortInputDto,
  FindTodosOutboundPortOutputDto,
} from '@/todo/outbound-port/find-todos.outbound-port.interface';

// import { Member } from '@/member/models/member.model';
import { TodoEntity } from '@/todo/entity/todo.entity';

export class FindTodosRepository implements IFindTodosOutboundPort {
  private readonly logger = new Logger(FindTodosRepository.name);

  constructor(
    @InjectRepository(TodoEntity)
    private readonly repository: Repository<TodoEntity>,
  ) {}
  async execute(
    params: FindTodosOutboundPortInputDto,
  ): Promise<FindTodosOutboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    const todos = await this.repository.find();
    this.logger.log(`Todos_entity: ${JSON.stringify(todos, null, 2)}`);

    return todos.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        content: todo.content,
      };
    });
  }
}
