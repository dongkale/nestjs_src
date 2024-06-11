import { BoardEntity, BoardId } from '@/board/domain/board.entity';

export interface HandleBoardPort {
  saveBoard(board: Partial<BoardEntity>): Promise<BoardEntity>;
  upsertBoard(board: Partial<BoardEntity>): Promise<void>;
  deleteBoard(id: BoardId): Promise<null>;
}
