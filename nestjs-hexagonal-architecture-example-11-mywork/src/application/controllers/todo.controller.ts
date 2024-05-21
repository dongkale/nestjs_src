import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from '@/core/services/todo.service';
import { CreateTodoDto } from '@/application/dto/create-todo.dto';
import { UpdateTodoDto } from '@/application/dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.createTodo(createTodoDto.content);
  }

  @Get(':id')
  async getTodo(@Param('id') id: number) {
    return await this.todoService.getTodo(id);
  }

  @Get()
  async getTodos() {
    return await this.todoService.getTodos();
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return await this.todoService.deleteTodo(id);
  }
}
