import { BoardRes } from '@/board/application/port/in/dto/board-res.dto';
import { GetBoardsUseCase } from '@/board/application/port/in/get-boards.use-case';
import { GetBoardsCommand } from '@/board/application/port/in/dto/get-boards.command';
import { GetBoardsPort } from '@/board/application/port/out/get-boards.port';
import { GetBoardsRes } from '@/board/application/port/in/dto/get-boards-res.dto';
import { GetBoardPort } from '@/board/application/port/out/get-board.port';
import { BoardId } from '@/board/domain/board.entity';
import { HandleBoardPort } from '@/board/application/port/out/handle-board.port';
import { CreateBoardReq } from '@/board/application/port/in/dto/create-board-req.dto';
import { HandleBoardUseCase } from '@/board/application/port/in/handle-board.use-case';
import { UpdateBoardReq } from '@/board/application/port/in/dto/update-board-req.dto';
import { NotFoundException } from '@nestjs/common';

export class BoardService implements GetBoardsUseCase, HandleBoardUseCase {
  constructor(
    private readonly _getBoardsPort: GetBoardsPort,
    private readonly _getBoardPort: GetBoardPort,
    private readonly _handleBoardPort: HandleBoardPort,
  ) {}

  async getBoards(command: GetBoardsCommand) {
    const boards = await this._getBoardsPort.getBoards(command);
    const boardsDto = boards.map((board) => {
      return new BoardRes(board);
    });
    const resDto = new GetBoardsRes(boardsDto);

    return resDto;
  }
  async getBoard(id: BoardId) {
    const board = await this._getBoardPort.getBoard(id);
    const boardDto = new BoardRes(board);
    return boardDto;
  }

  async createBoard(dto: CreateBoardReq): Promise<BoardRes> {
    const boardEntity = CreateBoardReq.of(dto).toEntity();
    const savedBoard = await this._handleBoardPort.saveBoard(boardEntity);
    const resDto = new BoardRes(savedBoard);
    return resDto;
  }

  async updateBoard(id: BoardId, dto: UpdateBoardReq) {
    const oldBoardEntity = await this._getBoardPort.getBoard(id);

    const newBoardEntity = UpdateBoardReq.of(id, dto).toEntity();

    // for (const key in newBoardEntity) {
    //   newBoardEntity[key] = newBoardEntity[key] ?? oldBoardEntity[key];
    // }

    // await this._handleBoardPort.upsertBoard(newBoardEntity);

    const mergeBoardEntity = { oldBoardEntity, ...newBoardEntity };

    await this._handleBoardPort.upsertBoard(mergeBoardEntity);

    const savedBoard = await this._getBoardPort.getBoard(id);

    const resDto = new BoardRes(savedBoard);

    return resDto;
  }

  async deleteBoard(id: BoardId): Promise<null> {
    const isExist: boolean = await this._getBoardPort.isExistById(id);

    if (!isExist) throw new NotFoundException('해당 id 게시글이 없습니다.');

    await this._handleBoardPort.deleteBoard(id);
    return null;
  }
}
