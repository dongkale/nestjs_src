// src/adapters/controllers/todo.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ITodoService } from '@/application/interfaces/itodo.service';
import { Todo } from '@/domain/entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: ITodoService) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  async createTodo(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.createTodo(todo);
  }

  @Put(':id')
  async updateTodo(@Param('id') id: number, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.updateTodo(id, todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}
