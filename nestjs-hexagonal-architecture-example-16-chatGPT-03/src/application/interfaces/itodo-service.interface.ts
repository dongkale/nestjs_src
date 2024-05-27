import { Todo } from '../../core/domain/todo.entity';

export interface ITodoService {
  createTodo(content: string): Promise<Todo>;
  getAllTodos(): Promise<Todo[]>;
  updateTodo(id: number, content: string, isDone: boolean): Promise<Todo>;
  deleteTodo(id: number): Promise<void>;
}
