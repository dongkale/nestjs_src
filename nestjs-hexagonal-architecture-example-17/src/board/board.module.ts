import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/auth/auth.module';
import { BoardRepository } from '@/board/adapters/driven/board.repository';
import { BoardsController } from '@/board/adapters/driving/boards.controller';
import { BoardsService } from '@/board/domain/boards.service';
import { Board } from '@/board/adapters/model/board.entity';
import { IBoardRepository } from '@/board/domain/outboundPorts/IBoardRepository';
import { IBoardService } from '@/board/domain/inboundPorts/IBoardService';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardsController],
  providers: [
    {
      provide: IBoardService,
      useClass: BoardsService,
    },
    {
      provide: IBoardRepository,
      useClass: BoardRepository,
    },
  ],
})
export class BoardsModule {}
