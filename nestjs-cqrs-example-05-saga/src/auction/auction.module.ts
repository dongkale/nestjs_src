import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { AuctionHandler } from './auction.handler';
import { AuctionRepository } from './auction.repository';
import { AuctionSaga } from './auction.saga';
import { GetAuctionHandler } from './auction.query';
import { Auction } from './auction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction]), CqrsModule],
  controllers: [],
  providers: [
    AuctionRepository,
    AuctionHandler,
    GetAuctionHandler,
    AuctionSaga,
  ],
})
export class AuctionModule {}
