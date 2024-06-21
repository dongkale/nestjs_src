import { Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IDeleteTodoOutboundPort,
  DeleteTodoOutboundPortInputDto,
  DeleteTodoOutboundPortOutputDto,
} from '@/todo/outbound-port/delete-todo.outbound-port.interface';

import { TodoOrmEntity } from '@/todo/outbound-adapter/typeorm-entity/todo.typeorm-entity';

export class DeleteTodoRepository implements IDeleteTodoOutboundPort {
  private readonly logger = new Logger(DeleteTodoRepository.name);

  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly repository: Repository<TodoOrmEntity>,
  ) {}
  async execute(
    params: DeleteTodoOutboundPortInputDto,
  ): Promise<DeleteTodoOutboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    const deleteTodo = await this.repository.findOneBy({
      id: params.id,
    });
    if (!deleteTodo) {
      throw new NotFoundException('Not Found Todo');
    }

    await this.repository.delete({ id: params.id });

    this.logger.log(`deleted todo: ${JSON.stringify(deleteTodo, null, 2)}`);

    return {
      id: deleteTodo.id,
      title: deleteTodo.title,
      content: deleteTodo.content,
    };
  }
}
