import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './cqrs/commands/create-task.command';
import { ListByIdTaskQuery } from './cqrs/queries/list-by-id-task.query';
import { ListTaskQuery } from './cqrs/queries/list-task.query';
import { UpdateByCompletedCommand } from './cqrs/commands/update-by-completed.command';
import { DeleteTaskCommand } from './cqrs/commands/delete-task.command';

@Controller('task')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body('description') description: string) {
    return this.commandBus.execute(new CreateTaskCommand(description));
  }

  @Get()
  async find() {
    return this.queryBus.execute(new ListTaskQuery());
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.queryBus.execute(new ListByIdTaskQuery(id));
  }

  @Patch(':id/completed/:completed')
  async updateByCompleted(
    @Param('id') id: number,
    @Param('completed') completed: boolean,
  ) {
    return this.commandBus.execute(new UpdateByCompletedCommand(id, completed));
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteTaskCommand(id));
  }
}
