import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './model/book';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BooksModule {}
