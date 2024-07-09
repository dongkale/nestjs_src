import {
  Controller,
  Render,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { Book } from '@/books/model/book';
import { BookService } from '@/books/service/book.service';
import { Response } from 'express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @Render('book')
  async allBook(): Promise<object> {
    const books = await this.bookService.getAllBook();
    return { books, page: 'book' };
  }

  @Post()
  async createBook(@Body() book: Book, @Res() res: Response): Promise<any> {
    await this.bookService.createBook(book);
    return res.redirect('/book');
  }

  @Get(':id')
  @Render('book-detail')
  async getBook(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const book = await this.bookService.getBook(id);
    return { book, page: 'detail' };
  }

  @Put(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() book: Book,
  ): Promise<Book> {
    return this.bookService.updateBook(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.deleteBook(id);
  }
}
