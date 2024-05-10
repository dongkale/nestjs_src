import { Injectable } from '@nestjs/common';
import { Todo } from '@/core/entities';
import { CreateTodoDto, UpdateTodoDto } from '@/core/dtos';

@Injectable()
export class TodoFactoryService {
  createNewTodo(createTodoDto: CreateTodoDto) {
    const newTodo = new Todo();
    // newTodo.id = createTodoDto.id;
    newTodo.description = createTodoDto.description;

    return newTodo;
  }

  updateTodo(updateTodoDto: UpdateTodoDto) {
    const updateTodo = new Todo();
    updateTodo.description = updateTodoDto.description;

    return updateTodo;
  }
}
