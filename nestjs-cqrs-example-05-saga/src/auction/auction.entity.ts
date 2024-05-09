import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auctionId: string;

  @Column()
  started?: Date;

  @Column()
  end?: Date;

  @Column()
  higher_bid: number;

  @Column()
  higher_bidder_id: string;

  @Column({
    type: 'json',
    nullable: true,
    transformer: {
      to(obj: any): string {
        return JSON.parse(obj);
      },
      from(value: any): string {
        return JSON.stringify(value);
      },
    },
  })
  history: string;

  @CreateDateColumn()
  createdAt?: Date = new Date();

  @UpdateDateColumn()
  updatedAt?: Date;
}
