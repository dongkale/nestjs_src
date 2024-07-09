import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { BooksModule } from '@/books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/configs/typeorm-config';
import { globalConfig } from '@/configs/global-config';

@Module({
  imports: [
    ConfigModule.forRoot(globalConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
