import { TodoModel } from '@/domain/model/todo';

export interface TodoRepository {
  insert(todo: TodoModel): Promise<TodoModel>;
  findAll(): Promise<TodoModel[]>;
  findById(id: number): Promise<TodoModel>;
  updateById(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
}
