import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  Logger,
} from '@nestjs/common';
import { ITodoService } from '@/modules/todo/inbound-port/todo.service.interface';
import { CreateTodoDto } from '@/modules/todo/models/create-todo.dto';
import { UpdateTodoDto } from '@/modules/todo/models/update-todo.dto';

@Controller('todos')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(
    @Inject(ITodoService) private readonly todoService: ITodoService,
  ) {}

  @Get()
  async getAll() {
    const get = await this.todoService.getAll();

    this.logger.log(JSON.stringify(get, null, 2));
    return get;
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const get = await this.todoService.get(id);

    this.logger.log(JSON.stringify(get, null, 2));
    return get;
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto.content);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(
      id,
      updateTodoDto.content,
      updateTodoDto.isDone,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(id);
  }
}
