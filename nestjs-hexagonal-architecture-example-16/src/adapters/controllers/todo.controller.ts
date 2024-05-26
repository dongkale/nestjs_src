// src/infrastructure/controllers/todo.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from '../../application/services/todo.service';
import { CreateTodoDto } from '../../application/dto/create-todo.dto';
import { UpdateTodoDto } from '../../application/dto/update-todo.dto';
import { ResponseDto } from '../../application/dto/response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Todo } from '../../core/domain/todo.entity';

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
    type: ResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createTodoDto: CreateTodoDto): Promise<ResponseDto<Todo>> {
    return this.todoService.createTodo(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({
    status: 200,
    description: 'Return all todos.',
    type: ResponseDto,
  })
  findAll(): Promise<ResponseDto<Todo[]>> {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the specified todo.',
    type: ResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  findOne(@Param('id') id: string): Promise<ResponseDto<Todo>> {
    return this.todoService.getTodoById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by id' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated.',
    type: ResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseDto<Todo>> {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by id' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully deleted.',
    type: ResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  remove(@Param('id') id: string): Promise<ResponseDto<Todo>> {
    return this.todoService.deleteTodo(id);
  }
}
