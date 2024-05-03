import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateByCompletedCommand } from '../commands/update-by-completed.command';

@CommandHandler(UpdateByCompletedCommand)
export class UpdateByCompletedHandler
  implements ICommandHandler<UpdateByCompletedCommand>
{
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async execute(command: UpdateByCompletedCommand): Promise<void> {
    const { id, completed } = command;
    await this.taskRepository.update(id, { completed });
  }
}
