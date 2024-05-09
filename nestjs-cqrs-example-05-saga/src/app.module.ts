import { MailModule } from './mail/mail.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { MailHandler } from './mail/mail.handler';
// import { BidHandler } from './bid/bid.handler';
// import { BidSaga } from './bid/bid.saga';
import { BidModule } from './bid/bid.module';
import { AuctionModule } from './auction/auction.module';

// import { AuctionHandler } from './auction/auction.handler';
// import { AuctionRepository } from './auction/auction.repository';
// import { AuctionSaga } from './auction/auction.saga';
// import { GetAuctionHandler } from './auction/auction.query';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        namingStrategy: new SnakeNamingStrategy(),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    CqrsModule,
    AuctionModule,
    BidModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    // MailHandler,
    // AuctionSaga,
    // BidHandler,
    // BidSaga,
    // AuctionHandler,
    // GetAuctionHandler,
    // AuctionRepository,
  ],
})
export class AppModule {}
