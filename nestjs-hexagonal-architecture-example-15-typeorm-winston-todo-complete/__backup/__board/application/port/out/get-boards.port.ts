import { GetBoardsCommand } from '@/board/application/port/in/dto/get-boards.command';
import { BoardEntity } from '@/board/domain/board.entity';

export interface GetBoardsPort {
  getBoards(command: GetBoardsCommand): Promise<BoardEntity[]>;
}
