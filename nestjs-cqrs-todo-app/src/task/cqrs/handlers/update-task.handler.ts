import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskCommand } from '../commands/update-task.command';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async execute(command: UpdateTaskCommand): Promise<Task> {
    const { id, description } = command;
    const result = await this.taskRepository.update(id, { description });
    if (!result.affected) {
      throw new Error('Task not found');
    }

    return await this.taskRepository.findOne({ where: { id } });
  }
}
