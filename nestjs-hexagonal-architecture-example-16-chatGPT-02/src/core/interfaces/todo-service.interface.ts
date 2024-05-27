import { Todo } from '@/core/domain/todo.entity';
import { CreateTodoDto } from '@/application/dto/create-todo.dto';
import { UpdateTodoDto } from '@/application/dto/update-todo.dto';

export interface ITodoService {
  getAllTodos(): Promise<Todo[]>;
  getTodoById(id: string): Promise<Todo>;
  createTodo(createTodoDto: CreateTodoDto): Promise<Todo>;
  updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}
