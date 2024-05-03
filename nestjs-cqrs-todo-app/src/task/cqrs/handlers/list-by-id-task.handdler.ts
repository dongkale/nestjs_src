import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { ListByIdTaskQuery } from '../queries/list-by-id-task.query';

@QueryHandler(ListByIdTaskQuery)
export class ListByIdTaskHandler implements IQueryHandler<ListByIdTaskQuery> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  execute(query: ListByIdTaskQuery): Promise<Task> {
    const { id } = query;
    return this.taskRepository.findOneBy({ id });
  }
}
