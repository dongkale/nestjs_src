import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuctionModel } from './auction.model';
import { IAuctionInterface } from './auction.interface';
import { Auction } from './auction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuctionRepository {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>,
  ) {}
  async getActionById(id: string) {
    // fetch it from database for example

    const r = await this.auctionRepository.findOne({
      where: { auctionId: '1' },
    });

    console.log(r);

    const auction: IAuctionInterface = {
      id,
      started: new Date(),
    };

    return new AuctionModel(auction);
  }

  async getAll() {
    return [];
  }
}
