import supertest, { SuperTest } from 'supertest'
import { createModule } from './utils/create-module.util'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AbstractMovieRepository } from '@/features/movie/domain/repositories/movie.repository'
import { MovieDocument } from '@/features/movie/domain/models/movie.model'

describe('Movie Controller - [POST] /movies', () => {
  let nestApp: INestApplication
  let movieRepository: AbstractMovieRepository<MovieDocument>
  let request: SuperTest<any>

  beforeAll(async () => {
    const { app, module } = await createModule()
    nestApp = app
    movieRepository = module.get<AbstractMovieRepository<MovieDocument>>(
      AbstractMovieRepository
    )
    request = supertest(app.getHttpServer())
  })

  it('should create a new movie', async () => {
    // ARRANGE
    const movie = {
      name: 'Batman Begins',
      category: 'ACTION',
      director: 'Christopher Nolan'
    }

    // ACT
    const createdMovieResponse = await request
      .post('/movies')
      .send(movie)
      .expect(HttpStatus.CREATED)

    const createdMovie = createdMovieResponse.body.payload

    // ASSERT
    expect(createdMovie).toEqual({
      _id: createdMovie._id,
      name: movie.name,
      category: movie.category,
      director: movie.director,
      createdAt: createdMovie.createdAt
    })
  })

  afterEach(async () => {
    await movieRepository.deleteMany({})
  })

  afterAll(async () => {
    await nestApp.close()
  })
})
