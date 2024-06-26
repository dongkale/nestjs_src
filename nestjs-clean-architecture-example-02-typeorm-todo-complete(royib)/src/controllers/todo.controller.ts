import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Logger,
} from '@nestjs/common';
import {
  CreateTodoDto,
  UpdateTodoDto,
  CreateTodoResponseDto,
} from '@/core/dtos';
import { TodoUseCases } from '@/use-cases/todo';
import { TodoFactoryService } from '@/use-cases/todo/todo-factory.service';

@Controller('api/todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(
    private todoUseCases: TodoUseCases,
    private todoFactoryService: TodoFactoryService
  ) {}

  @Get()
  async getAll() {
    const todo = await this.todoUseCases.getAllTodo();

    this.logger.log(JSON.stringify(todo, null, 2));

    return todo;
  }

  @Get(':id')
  async getById(@Param('id') id: any) {
    return this.todoUseCases.getTodoById(id);
  }

  @Post()
  async createTodo(
    @Body() todoDto: CreateTodoDto
  ): Promise<CreateTodoResponseDto> {
    const createTodoResponse = new CreateTodoResponseDto();
    try {
      const todo = this.todoFactoryService.createNewTodo(todoDto);
      const createdTodo = await this.todoUseCases.createTodo(todo);

      createTodoResponse.success = true;
      createTodoResponse.createdTodo = createdTodo;
    } catch (error) {
      createTodoResponse.success = false;
    }

    return createTodoResponse;
  }

  @Put(':id')
  updateTodo(
    @Param('id') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    const todo = this.todoFactoryService.updateTodo(updateTodoDto);
    return this.todoUseCases.updateTodo(todoId, todo);
  }
}
