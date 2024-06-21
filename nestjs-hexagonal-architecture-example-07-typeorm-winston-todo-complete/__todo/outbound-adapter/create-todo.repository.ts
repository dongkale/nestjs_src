import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateTodoOutboundPort,
  CreateTodoOutboundPortInputDto,
  CreateTodoOutboundPortOutputDto,
} from '@/todo/outbound-port/create-todo.outbound-port.interface';

// import { Member } from '@/member/models/member.model';
import { TodoOrmEntity } from '@/todo/outbound-adapter/todo.typeorm-entity';

export class CreateTodoRepository implements ICreateTodoOutboundPort {
  private readonly logger = new Logger(CreateTodoRepository.name);

  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly repository: Repository<TodoOrmEntity>,
  ) {}
  async execute(
    params: CreateTodoOutboundPortInputDto,
  ): Promise<CreateTodoOutboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    const create = this.repository.create({ ...params });
    const createdTodo = await this.repository.save(create);

    this.logger.log(`created todo: ${JSON.stringify(createdTodo, null, 2)}`);

    return {
      id: createdTodo.id,
      title: createdTodo.title,
      content: createdTodo.content,
    };
  }
}
