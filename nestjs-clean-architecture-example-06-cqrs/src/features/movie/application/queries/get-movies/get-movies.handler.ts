import { MovieDocument } from '@/features/movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@/features/movie/domain/repositories/movie.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetMoviesQuery } from './get-movies.query'

@QueryHandler(GetMoviesQuery)
export class GetMoviesQueryHandler implements IQueryHandler<GetMoviesQuery> {
  constructor(
    private readonly movieRepository: AbstractMovieRepository<MovieDocument>
  ) {}

  public async execute(): Promise<MovieDocument[] | null> {
    return this.movieRepository.find({})
  }
}
