import { Book, BookDocument } from '@/features/book/domain/models/book.model'
import { AbstractBookRepository } from '@/features/book/domain/repositories/book.repository'
import { BaseRepository } from '@/common/infrastructure/repositories/base.repository'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class BookRepository
  extends BaseRepository<BookDocument>
  implements AbstractBookRepository<BookDocument>
{
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {
    super(bookModel)
  }
}
