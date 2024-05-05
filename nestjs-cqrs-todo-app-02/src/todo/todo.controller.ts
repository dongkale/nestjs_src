import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateToDoCommand } from './create-todo-command';
import { GetToDoQuery } from './get-todo-query';

@Controller('ToDo')
export class ToDoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createToDo(
    @Body() body: { title: string; description: string },
  ): Promise<void> {
    const { title, description } = body;
    await this.commandBus.execute(new CreateToDoCommand(title, description));
  }

  @Get()
  async getToDo(): Promise<any[]> {
    return this.queryBus.execute(new GetToDoQuery());
  }
}
