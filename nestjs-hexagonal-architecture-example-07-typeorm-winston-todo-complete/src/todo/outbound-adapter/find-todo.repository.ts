import { Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IFindTodoOutboundPort,
  FindTodoOutboundPortInputDto,
  FindTodoOutboundPortOutputDto,
} from '@/todo/outbound-port/find-todo.outbound-port.interface';

// import { Member } from '@/member/models/member.model';
import { TodoOrmEntity } from '@/todo/outbound-adapter/todo.typeorm-entity';

export class FindTodoRepository implements IFindTodoOutboundPort {
  private readonly logger = new Logger(FindTodoRepository.name);

  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly repository: Repository<TodoOrmEntity>,
  ) {}
  async execute(
    params: FindTodoOutboundPortInputDto,
  ): Promise<FindTodoOutboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    const todo = await this.repository.findOneBy({ id: params.id });
    if (!todo) {
      throw new NotFoundException('Not Found Todo');
    }

    this.logger.log(`todo_entity: ${JSON.stringify(todo, null, 2)}`);

    return {
      id: todo.id,
      title: todo.title,
      content: todo.content,
    };
  }
}
