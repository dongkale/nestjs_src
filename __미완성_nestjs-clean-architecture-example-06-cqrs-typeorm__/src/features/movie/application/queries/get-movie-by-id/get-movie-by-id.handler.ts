import { MovieDocument } from '@/features/movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@/features/movie/domain/repositories/movie.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetMovieByIdQuery } from './get-movie-by-id.query'

@QueryHandler(GetMovieByIdQuery)
export class GetMovieByIdQueryHandler
  implements IQueryHandler<GetMovieByIdQuery>
{
  constructor(
    private readonly movieRepository: AbstractMovieRepository<MovieDocument>
  ) {}

  public async execute({
    movieId
  }: GetMovieByIdQuery): Promise<MovieDocument | null> {
    return this.movieRepository.findById(movieId)
  }
}
