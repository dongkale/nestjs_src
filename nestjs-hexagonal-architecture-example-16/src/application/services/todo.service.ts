// src/application/services/todo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from '../../core/repositories/todo.repository';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { ResponseDto } from '../dto/response.dto';
import { Todo } from '../../core/domain/todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<ResponseDto<Todo>> {
    const todo = this.todoRepository.create(createTodoDto);
    return new ResponseDto<Todo>('success', 'Todo created successfully', todo);
  }

  async getAllTodos(): Promise<ResponseDto<Todo[]>> {
    const todos = await this.todoRepository.find();
    return new ResponseDto<Todo[]>(
      'success',
      'Todos retrieved successfully',
      todos,
    );
  }

  async getTodoById(id: string): Promise<ResponseDto<Todo>> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return new ResponseDto<Todo>(
      'success',
      'Todo retrieved successfully',
      todo,
    );
  }

  async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseDto<Todo>> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.update(id, updateTodoDto);
    const updatedTodo = await this.todoRepository.findOne(id);
    return new ResponseDto<Todo>(
      'success',
      'Todo updated successfully',
      updatedTodo,
    );
  }

  async deleteTodo(id: string): Promise<ResponseDto<Todo>> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.delete(id);
    return new ResponseDto<Todo>('success', 'Todo deleted successfully', todo);
  }
}
