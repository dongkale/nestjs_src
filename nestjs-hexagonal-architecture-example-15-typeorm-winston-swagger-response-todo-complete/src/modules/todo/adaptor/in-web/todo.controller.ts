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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '@/commons/response/response.entity';
import { UpdateTodoValidationPipe } from '@/todo/application/port/in/pipe/update-todo-validation.pipe';
import { UpdateTodoBodyRequest } from '@/todo/application/port/in/dto/request/update-todo-body-request.dto';
import { TodoId } from '@/todo/domain/todo.entity';
import { CreateTodoRequest } from '@/todo/application/port/in/dto/request/create-todo-request.dto';
import {
  TodoUseCase,
  TodoUseCaseSymbol,
} from '@/todo/application/port/in/todo.use-case';

@ApiTags('ticket API')
@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);
  constructor(
    @Inject(TodoUseCaseSymbol)
    private readonly todoUseCase: TodoUseCase,
  ) {}

  @ApiOperation({
    summary: 'Get All Todo',
    description: '모든 Todo를 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: '모든 Todo 정보',
    type: ResponseEntity,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getTodos() {
    const todos = await this.todoUseCase.getTodos();

    this.logger.log(JSON.stringify(todos, null, 2));

    return ResponseEntity.OK_WITH(todos);
  }

  @ApiOperation({
    summary: 'Get One Todo',
    description: '지정 Todo를 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: '지정 Todo 정보',
    type: ResponseEntity,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTodo(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todoUseCase.getTodo(id);

    this.logger.log(JSON.stringify(todo, null, 2));

    return ResponseEntity.OK_WITH(todo);
  }

  @ApiOperation({ summary: 'Create Todo', description: 'Todo를 생성한다.' })
  @ApiResponse({
    status: 200,
    description: '생성된 Todo 정보',
    type: ResponseEntity,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTodo(@Body() dto: CreateTodoRequest) {
    const createTodo = await this.todoUseCase.createTodo(dto);

    this.logger.log(JSON.stringify(createTodo, null, 2));

    return ResponseEntity.CREATED_WITH(createTodo);
  }

  @ApiOperation({ summary: 'Update Todo', description: 'Todo를 수정한다.' })
  @ApiResponse({
    status: 200,
    description: '수정된 Todo 정보',
    type: ResponseEntity,
  })
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

  @ApiOperation({ summary: 'Delete Todo', description: 'Todo를 삭제한다.' })
  @ApiResponse({
    status: 200,
    description: '삭제된 Todo 정보',
    type: ResponseEntity,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) todoId: TodoId) {
    const deleteTodo = await this.todoUseCase.deleteTodo(todoId);

    this.logger.log(JSON.stringify(deleteTodo, null, 2));

    return ResponseEntity.OK_WITH(deleteTodo);
  }
}
