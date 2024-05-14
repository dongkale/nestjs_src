import { Injectable, OnApplicationBootstrap  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDataServices } from '../../../core';
import { Author, Book, Genre } from './model';
import { TypeOrmGenericRepository } from './typeorm-generic-repository';

@Injectable()
export class TypeOrmDataServices
  implements IDataServices, OnApplicationBootstrap
{
  authors: TypeOrmGenericRepository<Author>;
  books: TypeOrmGenericRepository<Book>;
  genres: TypeOrmGenericRepository<Genre>;

  constructor(
    @InjectRepository(Author)
    private AuthorRepository: Repository<Author>,
    @InjectRepository(Book)
    private BookRepository: Repository<Book>,
    @InjectRepository(Genre)
    private GenreRepository: Repository<Genre>
  ) {}

  onApplicationBootstrap() {
    this.authors = new TypeOrmGenericRepository<Author>(this.AuthorRepository);
    this.books = new TypeOrmGenericRepository<Book>(this.BookRepository);
    this.genres = new TypeOrmGenericRepository<Genre>(this.GenreRepository);
  }
}
