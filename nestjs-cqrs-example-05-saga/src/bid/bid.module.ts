/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BidHandler } from './bid.handler';
import { BidSaga } from './bid.saga';
import { AuctionRepository } from '@/auction/auction.repository';
import { Auction } from '@/auction/auction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction]), CqrsModule],
  controllers: [],
  providers: [BidHandler, BidSaga, AuctionRepository],
})
export class BidModule {}
