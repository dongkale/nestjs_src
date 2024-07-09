import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '@/books/model/book';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBook(): Promise<Book[]> {
    return await this.bookRepository.find({ order: { createdAt: 'DESC' } });
  }

  async createBook(book: Book): Promise<Book> {
    return await this.bookRepository.save(book);
  }

  async getBook(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }
  async updateBook(id: number, book: Book): Promise<Book> {
    const updateBook = await this.bookRepository.update(id, book);
    if (!updateBook) {
      throw new HttpException('Book id not found', HttpStatus.NOT_FOUND);
    }

    const updatedBook = await this.bookRepository.findOneBy({ id });
    if (!updatedBook) {
      throw new HttpException('Book id not found', HttpStatus.NOT_FOUND);
    }

    return updatedBook;
  }
  async deleteBook(id: number): Promise<any> {
    if (await this.bookRepository.delete(id)) {
      return null;
    }
    throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
  }
}
