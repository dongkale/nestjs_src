import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from '../../application/services/todo.service';
import { CreateTodoDto, UpdateTodoDto } from '../../application/dto/todo.dto';
import { ResponseDto } from '../../application/dto/response.dto';
import { Response } from 'express';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
    const todo = await this.todoService.createTodo(createTodoDto.content);
    return res
      .status(HttpStatus.CREATED)
      .json(new ResponseDto('success', 'Todo created successfully', todo));
  }

  @Get()
  async findAll(@Res() res: Response) {
    const todos = await this.todoService.getAllTodos();
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'Todos retrieved successfully', todos));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Res() res: Response,
  ) {
    const todo = await this.todoService.updateTodo(
      id,
      updateTodoDto.content,
      updateTodoDto.isDone,
    );
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'Todo updated successfully', todo));
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.todoService.deleteTodo(id);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'Todo deleted successfully', null));
  }
}
