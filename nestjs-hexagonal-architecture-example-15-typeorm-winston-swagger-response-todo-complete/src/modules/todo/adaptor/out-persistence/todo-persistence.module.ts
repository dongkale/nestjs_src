import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from '@/todo/application/todo.service';
import { TodoUseCaseSymbol } from '@/todo/application/port/in/todo.use-case';
import { TodoPersistenceAdaptor } from '@/todo/adaptor/out-persistence/todo-persistence.adaptor';
import { TodoOrmEntity } from '@/todo/adaptor/out-persistence/todo.typeorm-entity';
import { GetTodoPort } from '@/todo/application/port/out/get-todo.port';
import { GetTodosPort } from '@/todo/application/port/out/get-todos.port';
import { CreateTodoPort } from '@/todo/application/port/out/create-todo.port';
import { UpdateTodoPort } from '@/todo/application/port/out/update-todo.port';
import { DeleteTodoPort } from '@/todo/application/port/out/delete-todo.port';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TodoOrmEntity])],
  providers: [
    TodoPersistenceAdaptor,
    // {
    //   provide: GetBoardsUseCaseSymbol,
    //   useFactory: (
    //     boardPersistenceAdaptor: GetBoardsPort | GetBoardPort | HandleBoardPort,
    //   ) => {
    //     return new BoardService(
    //       boardPersistenceAdaptor as GetBoardsPort,
    //       boardPersistenceAdaptor as GetBoardPort,
    //       boardPersistenceAdaptor as HandleBoardPort,
    //     );
    //   },
    //   inject: [BoardPersistenceAdaptor],
    // },
    {
      provide: TodoUseCaseSymbol,
      useFactory: (
        todoPersistenceAdaptor:
          | GetTodoPort
          | GetTodosPort
          | CreateTodoPort
          | UpdateTodoPort
          | DeleteTodoPort,
      ) => {
        return new TodoService(
          todoPersistenceAdaptor as GetTodoPort,
          todoPersistenceAdaptor as GetTodosPort,
          todoPersistenceAdaptor as CreateTodoPort,
          todoPersistenceAdaptor as UpdateTodoPort,
          todoPersistenceAdaptor as DeleteTodoPort,
        );
      },
      inject: [TodoPersistenceAdaptor],
    },
  ],
  exports: [TodoUseCaseSymbol],
})
export class TodoPersistenceModule {}
