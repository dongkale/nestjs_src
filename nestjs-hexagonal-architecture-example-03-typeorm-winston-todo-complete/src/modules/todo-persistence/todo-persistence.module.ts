import { TodoService } from '@/domains/services/todo.service';
import { TodoUseCaseSymbol } from '@/domains/ports/in/todo.use-case';
import { Global, Module } from '@nestjs/common';
import { TodoPersistenceAdaptor } from '@/modules/todo-persistence/todo-persistence.adaptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoOrmEntity } from '@/modules/todo-persistence/todo.orm-entity';
import { CreateTodoPort } from '@/domains/ports/out/create-todo.port';
import { GetTodosPort } from '@/domains/ports/out/get-todos.port';
import { GetTodoPort } from '@/domains/ports/out/get-todo.port';
import { UpdateTodoPort } from '@/domains/ports/out/update-todo.port';
import { DeleteTodoPort } from '@/domains/ports/out/delete-todo.port';
// import { HandleBoardUseCaseSymbol } from '@/board/application/port/in/handle-board.use-case';
// import { GetBoardsPort } from '@/board/application/port/out/get-boards.port';
// import { GetBoardPort } from '@/board/application/port/out/get-board.port';
// import { HandleBoardPort } from '@/board/application/port/out/handle-board.port';

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
          | GetTodosPort
          | GetTodoPort
          | CreateTodoPort
          | UpdateTodoPort
          | DeleteTodoPort,
      ) => {
        return new TodoService(
          todoPersistenceAdaptor as GetTodosPort,
          todoPersistenceAdaptor as GetTodoPort,
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
