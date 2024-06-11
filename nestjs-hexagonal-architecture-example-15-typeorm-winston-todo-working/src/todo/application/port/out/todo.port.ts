import { TodoEntity, TodoId } from '@/todo/domain/todo.entity';

export interface TodoPort {
  getTodos(): Promise<TodoEntity[]>;
  getTodo(todoId: TodoId): Promise<TodoEntity>;
  saveTodo(todo: Partial<TodoEntity>): Promise<TodoEntity>;
  updateTodo(todo: Partial<TodoEntity>): Promise<void>;
  // upsertBoard(board: Partial<BoardEntity>): Promise<void>;
  // deleteBoard(id: BoardId): Promise<null>;
  isExistById(id: TodoId): Promise<boolean>;
}
