import { HandleBoardPort } from '@/board/application/port/out/handle-board.port';
import { GetBoardPort } from '@/board/application/port/out/get-board.port';
import { BoardEntity, BoardId } from '@/board/domain/board.entity';
import { GetBoardsCommand } from '@/board/application/port/in/dto/get-boards.command';
import { GetBoardsPort } from '@/board/application/port/out/get-boards.port';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardOrmEntity } from '@/board/adaptor/out-persistence/board.orm-entity';
import { FindManyOptions, Repository } from 'typeorm';
import { BoardMapper } from '@/board/adaptor/out-persistence/board.mapper';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class BoardPersistenceAdaptor
  implements GetBoardsPort, GetBoardPort, HandleBoardPort
{
  constructor(
    @InjectRepository(BoardOrmEntity)
    private readonly _boardRepository: Repository<BoardOrmEntity>,
  ) {}

  async getBoards(command: GetBoardsCommand): Promise<BoardEntity[]> {
    const findOptions: FindManyOptions<BoardOrmEntity> = {
      take: command.pageSize, //limit
      skip: command.pageNum, //offset
    };
    const boards = await this._boardRepository.find(findOptions);

    return BoardMapper.mapToBoards(boards);
  }

  async getBoard(id: number): Promise<BoardEntity> {
    const board = await this._boardRepository.findOneBy({ id });

    if (!board) throw new NotFoundException('해당 id 게시글이 없습니다.');

    return BoardMapper.mapToBoard(board);
  }

  async saveBoard(board: BoardEntity): Promise<BoardEntity> {
    const boardOrmEntity = BoardMapper.mapToBoardOrmEntity(board);

    const savedBoard = await this._boardRepository.save(boardOrmEntity);

    return BoardMapper.mapToBoard(savedBoard);
  }

  async upsertBoard(board: BoardEntity): Promise<void> {
    const newBoardEntity = BoardMapper.mapToBoardOrmEntity(board);
    await this._boardRepository.upsert(newBoardEntity, ['id']);
  }

  async deleteBoard(boardId: BoardId): Promise<null> {
    const result = await this._boardRepository.softDelete(boardId);
    if (!result) {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    // if (result.affected < 1) {
    //   throw new BadRequestException('잘못된 요청입니다.');
    // }

    return null;
  }

  async isExistById(id: BoardId): Promise<boolean> {
    const existOptions = { where: { id } };

    return await this._boardRepository.exist(existOptions);
  }
}
