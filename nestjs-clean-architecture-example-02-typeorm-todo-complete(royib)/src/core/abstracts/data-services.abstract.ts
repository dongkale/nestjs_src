import { Todo } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract todos: IGenericRepository<Todo>;
}
