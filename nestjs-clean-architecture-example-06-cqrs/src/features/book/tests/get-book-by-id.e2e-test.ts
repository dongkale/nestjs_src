import supertest, { SuperTest } from 'supertest'
import { createModule } from './utils/create-module.util'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AbstractBookRepository } from '@/features/book/domain/repositories/book.repository'
import { BookDocument } from '@/features/book/domain/models/book.model'

describe('Book Controller - [GET] /books/:bookId', () => {
  let nestApp: INestApplication
  let bookRepository: AbstractBookRepository<BookDocument>
  let request: SuperTest<any>

  beforeAll(async () => {
    const { app, module } = await createModule()
    nestApp = app
    bookRepository = module.get<AbstractBookRepository<BookDocument>>(
      AbstractBookRepository
    )
    request = supertest(app.getHttpServer())
  })

  it('should get the book by id', async () => {
    // ARRANGE
    const book = {
      name: 'The End of Everything',
      category: 'SCIENCE',
      author: 'Katie Mack'
    }

    const createdBookResponse = await request
      .post('/books')
      .send(book)
      .expect(HttpStatus.CREATED)

    const createdBook = createdBookResponse.body.payload

    // ACT
    const fetchedBookResponse = await request
      .get(`/books/${createdBook._id}`)
      .expect(HttpStatus.OK)

    const fetchedBook = fetchedBookResponse.body.payload

    // ASSERT
    expect(fetchedBook).toEqual({
      _id: createdBook._id,
      name: book.name,
      category: book.category,
      author: book.author,
      createdAt: createdBook.createdAt
    })
  })

  afterEach(async () => {
    await bookRepository.deleteMany({})
  })

  afterAll(async () => {
    await nestApp.close()
  })
})
