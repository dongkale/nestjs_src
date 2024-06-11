import { TodoService } from '@/todo/application/todo.service';
import { TodoUseCaseSymbol } from '@/todo/application/port/in/todo.use-case';
import { Global, Module } from '@nestjs/common';
import { TodoPersistenceAdaptor } from '@/todo/adaptor/out-persistence/todo-persistence.adaptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoOrmEntity } from '@/todo/adaptor/out-persistence/todo.orm-entity';
import { TodoPort } from '@/todo/application/port/out/todo.port';
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
      useFactory: (todoPersistenceAdaptor: TodoPort) => {
        return new TodoService(todoPersistenceAdaptor as TodoPort);
      },
      inject: [TodoPersistenceAdaptor],
    },
  ],
  exports: [TodoUseCaseSymbol],
})
export class TodoPersistenceModule {}
