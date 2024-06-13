import { UpdateTodoValidationPipe } from '@/todo/application/port/in/pipe/update-todo-validation.pipe';
import { UpdateTodoBodyRequest } from '@/todo/application/port/in/dto/request/update-todo-body-request.dto';
import { TodoId } from '@/todo/domain/todo.entity';
import { CreateTodoRequest } from '@/todo/application/port/in/dto/request/create-todo-request.dto';
import { ResponseEntity } from '@/common/response/response.entity';
import {
  TodoUseCase,
  TodoUseCaseSymbol,
} from '@/todo/application/port/in/todo.use-case';
import {
  Controller,
  Get,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Body,
  ParseIntPipe,
  Logger,
  Delete,
} from '@nestjs/common';

@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);
  constructor(
    @Inject(TodoUseCaseSymbol)
    private readonly todoUseCase: TodoUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getTodos() {
    const todos = await this.todoUseCase.getTodos();

    this.logger.log(JSON.stringify(todos, null, 2));

    return ResponseEntity.OK_WITH(todos);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTodo(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todoUseCase.getTodo(id);

    this.logger.log(JSON.stringify(todo, null, 2));

    return ResponseEntity.OK_WITH(todo);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTodo(@Body() dto: CreateTodoRequest) {
    const createTodo = await this.todoUseCase.createTodo(dto);

    this.logger.log(JSON.stringify(createTodo, null, 2));

    return ResponseEntity.CREATED_WITH(createTodo);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) todoId: TodoId,
    @Body(UpdateTodoValidationPipe) dto: UpdateTodoBodyRequest,
  ) {
    const updateTodo = await this.todoUseCase.updateTodo(todoId, dto);

    this.logger.log(JSON.stringify(updateTodo, null, 2));

    return ResponseEntity.OK_WITH(updateTodo);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) todoId: TodoId) {
    const deleteTodo = await this.todoUseCase.deleteTodo(todoId);

    this.logger.log(JSON.stringify(deleteTodo, null, 2));

    return ResponseEntity.OK_WITH(deleteTodo);
  }
}
