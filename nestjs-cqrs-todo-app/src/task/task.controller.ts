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
import { UpdateTaskCommand } from './cqrs/commands/update-task.command';

@Controller('task')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body('description') description: string) {
    const result = await this.commandBus.execute(
      new CreateTaskCommand(description),
    );

    console.log(result);
    return result;
  }

  @Get()
  async find() {
    const result = await this.queryBus.execute(new ListTaskQuery());

    console.log(result);
    return result;
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const result = await this.queryBus.execute(new ListByIdTaskQuery(id));

    console.log(result);
    return result;
  }

  @Patch(':id/completed/:completed')
  async updateByCompleted(
    @Param('id') id: number,
    @Param('completed') completed: boolean,
  ) {
    const result = await this.commandBus.execute(
      new UpdateByCompletedCommand(id, completed),
    );

    console.log(result);
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('description') description: string,
  ) {
    const result = await this.commandBus.execute(
      new UpdateTaskCommand(id, description),
    );

    console.log(result);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.commandBus.execute(new DeleteTaskCommand(id));

    console.log(result);
    return result;
  }
}
