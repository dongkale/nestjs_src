import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDataServices } from '../../../core';
import { Todo } from './model';
import { TypeOrmGenericRepository } from './typeorm-generic-repository';

@Injectable()
export class TypeOrmDataServices
  implements IDataServices, OnApplicationBootstrap
{
  todos: TypeOrmGenericRepository<Todo>;

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) {}

  onApplicationBootstrap() {
    this.todos = new TypeOrmGenericRepository<Todo>(this.todoRepository);
  }
}
