import { BoardId } from '@/board/domain/board.entity';
import { BoardRes } from '@/board/application/port/in/dto/board-res.dto';
import { CreateBoardReq } from '@/board/application/port/in/dto/create-board-req.dto';
import { UpdateBoardBodyReq } from '@/board/application/port/in/dto/update-board-body-req.dto';

export const HandleBoardUseCaseSymbol = Symbol('HandleBoardUseCase');

export interface HandleBoardUseCase {
  createBoard(dto: CreateBoardReq): Promise<BoardRes>;
  updateBoard(id: BoardId, dto: UpdateBoardBodyReq): Promise<BoardRes>;
  deleteBoard(id: BoardId): Promise<null>;
}
