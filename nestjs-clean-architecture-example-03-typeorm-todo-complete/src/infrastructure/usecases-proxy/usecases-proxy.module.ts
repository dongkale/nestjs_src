import { DynamicModule, Module } from '@nestjs/common';
import { addTodoUseCases } from '@/usecases/todo/addTodo.usecases';
import { deleteTodoUseCases } from '@/usecases/todo/deleteTodo.usecases';
import { GetTodoUseCases } from '@/usecases/todo/getTodo.usecases';
import { getTodosUseCases } from '@/usecases/todo/getTodos.usecases';
import { updateTodoUseCases } from '@/usecases/todo/updateTodo.usecases';

import { ExceptionsModule } from '@/infrastructure/exceptions/exceptions.module';
import { LoggerModule } from '@/infrastructure/logger/logger.module';
import { LoggerService } from '@/infrastructure/logger/logger.service';

import { BcryptModule } from '@/infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule } from '@/infrastructure/services/jwt/jwt.module';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';

import { DatabaseTodoRepository } from '@/infrastructure/repositories/todo.repository';

import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@/infrastructure/config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
  static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
  static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
  static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
  static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODO_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new GetTodoUseCases(todoRepository)),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new getTodosUseCases(todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.POST_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new addTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new updateTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new deleteTodoUseCases(logger, todoRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_TODO_USECASES_PROXY,
        UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
        UsecasesProxyModule.POST_TODO_USECASES_PROXY,
        UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
        UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
      ],
    };
  }
}
