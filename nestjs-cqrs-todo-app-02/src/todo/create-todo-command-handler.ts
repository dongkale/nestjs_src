import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateToDoCommand } from './create-todo-command';

@CommandHandler(CreateToDoCommand)
export class CreateToDoHandler implements ICommandHandler<CreateToDoCommand> {
  async execute(command: CreateToDoCommand): Promise<void> {
    // Add Logic to do validation and business rule
    const { title, description } = command;

    console.log(`Title: ${title}, Description: ${description}`);

    // Use Repository to save directly or Create Factory to add business logic and save
  }
}
