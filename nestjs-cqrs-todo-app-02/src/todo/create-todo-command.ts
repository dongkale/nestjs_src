import { ICommand } from '@nestjs/cqrs';

export class CreateToDoCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
  ) {}
}
