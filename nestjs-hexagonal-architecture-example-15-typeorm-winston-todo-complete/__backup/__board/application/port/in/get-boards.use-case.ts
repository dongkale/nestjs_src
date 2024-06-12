import { BoardId } from '@/board/domain/board.entity';
import { BoardRes } from '@/board/application/port/in/dto/board-res.dto';
import { GetBoardsRes } from '@/board/application/port/in/dto/get-boards-res.dto';
import { GetBoardsCommand } from '@/board/application/port/in/dto/get-boards.command';

export const GetBoardsUseCaseSymbol = Symbol('GetBoardsUseCase');

export interface GetBoardsUseCase {
  getBoards(command: GetBoardsCommand): Promise<GetBoardsRes>;
  getBoard(boardId: BoardId): Promise<BoardRes>;
}
