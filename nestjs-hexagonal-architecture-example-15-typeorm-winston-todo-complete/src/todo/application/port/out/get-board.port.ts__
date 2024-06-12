import { BoardEntity, BoardId } from '@/board/domain/board.entity';

export interface GetBoardPort {
  getBoard(boardId: BoardId): Promise<BoardEntity>;
  isExistById(id: BoardId): Promise<boolean>;
}
