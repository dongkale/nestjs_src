import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TodoService } from '@/application/services/todo.service';
import { CreateTodoDto } from '@/application/dto/create-todo.dto';
import { UpdateTodoDto } from '@/application/dto/update-todo.dto';
import { ResponseDto } from '@/application/dto/response.dto';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { Response } from 'express';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
    const todo = await this.todoService.createTodo(createTodoDto);
    return res
      .status(HttpStatus.CREATED)
      .json(new ResponseDto('success', 'Todo created successfully', todo));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res: Response) {
    const todos = await this.todoService.getAllTodos();
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'Todos retrieved successfully', todos));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTodoById(@Param('id') id: string, @Res() res: Response) {
    const todo = await this.todoService.getTodoById(id);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'Todos retrieved successfully', todo));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Res() res: Response,
  ) {
    const todo = await this.todoService.updateTodo(id, updateTodoDto);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'Todo updated successfully', todo));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Res() res: Response) {
    await this.todoService.deleteTodo(id);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'Todo deleted successfully', null));
  }
}
