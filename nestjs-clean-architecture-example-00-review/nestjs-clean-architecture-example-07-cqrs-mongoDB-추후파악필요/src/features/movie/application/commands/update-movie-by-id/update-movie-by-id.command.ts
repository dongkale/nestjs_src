import { MovieDTO } from '@/features/movie/application/dto/movie.dto'

export class UpdateMovieByIdCommand {
  constructor(
    public readonly movieId: string,
    public readonly movie: MovieDTO
  ) {}
}
