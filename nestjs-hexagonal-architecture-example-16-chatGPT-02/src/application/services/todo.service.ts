import { Injectable, NotFoundException } from '@nestjs/common';
import { ITodoService } from '@/core/interfaces/todo-service.interface';
import { ITodoRepository } from '@/core/interfaces/todo-repository.interface';
import { CreateTodoDto } from '@/application/dto/create-todo.dto';
import { UpdateTodoDto } from '@/application/dto/update-todo.dto';
import { Todo } from '@/core/domain/todo.entity';

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async getTodoById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.content = createTodoDto.content;
    todo.isDone = createTodoDto.isDone;
    return this.todoRepository.create(todo);
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.content = updateTodoDto.content || todo.content;
    todo.isDone =
      updateTodoDto.isDone !== undefined ? updateTodoDto.isDone : todo.isDone;
    await this.todoRepository.update(id, todo);
    return this.todoRepository.findOne(id);
  }

  async deleteTodo(id: string): Promise<void> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.delete(id);
  }
}
