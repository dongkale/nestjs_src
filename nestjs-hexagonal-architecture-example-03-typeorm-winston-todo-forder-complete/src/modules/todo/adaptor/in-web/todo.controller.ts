import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseIntPipe,
  Logger,
  Delete,
} from '@nestjs/common';
import {
  TodoUseCase,
  TodoUseCaseSymbol,
} from '@/todo/domains/ports/in/todo.use-case';
import { ResponseEntity } from '@/commons/response/response.entity';
import { CreateTodoRequest } from '@/todo/domains/ports/in/dto/request/create-todo-request.dto';
import { TodoId } from '@/todo/domains/entities/todo.entity';
import { UpdateTodoValidationPipe } from '@/todo/domains/ports/in/pipe/update-todo-validation.pipe';
import { UpdateTodoBodyRequest } from '@/todo/domains/ports/in/dto/request/update-todo-body-request.dto';

@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);
  constructor(
    @Inject(TodoUseCaseSymbol)
    private readonly todoUseCase: TodoUseCase,
  ) {}

  @Get()
  async getTodos() {
    const todos = await this.todoUseCase.getTodos();

    this.logger.log(JSON.stringify(todos, null, 2));

    return ResponseEntity.OK_WITH(todos);
  }

  @Get(':id')
  async getTodo(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todoUseCase.getTodo(id);

    this.logger.log(JSON.stringify(todo, null, 2));

    return ResponseEntity.OK_WITH(todo);
  }

  @Post()
  async createTodo(@Body() dto: CreateTodoRequest) {
    const createTodo = await this.todoUseCase.createTodo(dto);

    this.logger.log(JSON.stringify(createTodo, null, 2));

    return ResponseEntity.CREATED_WITH(createTodo);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) todoId: TodoId,
    @Body(UpdateTodoValidationPipe) dto: UpdateTodoBodyRequest,
  ) {
    const updateTodo = await this.todoUseCase.updateTodo(todoId, dto);

    this.logger.log(JSON.stringify(updateTodo, null, 2));

    return ResponseEntity.OK_WITH(updateTodo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) todoId: TodoId) {
    const deleteTodo = await this.todoUseCase.deleteTodo(todoId);

    this.logger.log(JSON.stringify(deleteTodo, null, 2));

    return ResponseEntity.OK_WITH(deleteTodo);
  }
}
