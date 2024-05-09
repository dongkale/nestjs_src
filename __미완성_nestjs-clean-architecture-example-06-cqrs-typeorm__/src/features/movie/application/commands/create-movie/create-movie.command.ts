import { MovieDTO } from '@/features/movie/application/dto/movie.dto'

export class CreateMovieCommand {
  constructor(public readonly movie: MovieDTO) {}
}
