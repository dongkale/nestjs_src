import { Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IUpdateTodoOutboundPort,
  UpdateTodoOutboundPortInputDto,
  UpdateTodoOutboundPortOutputDto,
} from '@/todo/outbound-port/update-todo.outbound-port.interface';

// import { Member } from '@/member/models/member.model';
import { TodoOrmEntity } from '@/todo/outbound-adapter/todo.typeorm-entity';

export class UpdateTodoRepository implements IUpdateTodoOutboundPort {
  private readonly logger = new Logger(UpdateTodoRepository.name);

  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly repository: Repository<TodoOrmEntity>,
  ) {}
  async execute(
    params: UpdateTodoOutboundPortInputDto,
  ): Promise<UpdateTodoOutboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    await this.repository.update(params.id, {
      ...params,
      updatedAt: new Date(),
    });

    const updateTodo = await this.repository.findOneBy({
      id: params.id,
    });
    if (!updateTodo) {
      throw new NotFoundException('Not Found Todo');
    }

    this.logger.log(`updated todo: ${JSON.stringify(updateTodo, null, 2)}`);

    return {
      id: updateTodo.id,
      title: updateTodo.title,
      content: updateTodo.content,
    };
  }
}
