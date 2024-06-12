import { BoardService } from '@/board/application/board.service';
import { GetBoardsUseCaseSymbol } from '@/board/application/port/in/get-boards.use-case';
import { Global, Module } from '@nestjs/common';
import { BoardPersistenceAdaptor } from '@/board/adaptor/out-persistence/board-persistence.adaptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardOrmEntity } from '@/board/adaptor/out-persistence/board.orm-entity';
import { HandleBoardUseCaseSymbol } from '@/board/application/port/in/handle-board.use-case';
import { GetBoardsPort } from '@/board/application/port/out/get-boards.port';
import { GetBoardPort } from '@/board/application/port/out/get-board.port';
import { HandleBoardPort } from '@/board/application/port/out/handle-board.port';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BoardOrmEntity])],
  providers: [
    BoardPersistenceAdaptor,
    {
      provide: GetBoardsUseCaseSymbol,
      useFactory: (
        boardPersistenceAdaptor: GetBoardsPort | GetBoardPort | HandleBoardPort,
      ) => {
        return new BoardService(
          boardPersistenceAdaptor as GetBoardsPort,
          boardPersistenceAdaptor as GetBoardPort,
          boardPersistenceAdaptor as HandleBoardPort,
        );
      },
      inject: [BoardPersistenceAdaptor],
    },
    {
      provide: HandleBoardUseCaseSymbol,
      useFactory: (
        boardPersistenceAdaptor: GetBoardsPort | GetBoardPort | HandleBoardPort,
      ) => {
        return new BoardService(
          boardPersistenceAdaptor as GetBoardsPort,
          boardPersistenceAdaptor as GetBoardPort,
          boardPersistenceAdaptor as HandleBoardPort,
        );
      },
      inject: [BoardPersistenceAdaptor],
    },
  ],
  exports: [GetBoardsUseCaseSymbol, HandleBoardUseCaseSymbol],
})
export class BoardPersistenceModule {}
