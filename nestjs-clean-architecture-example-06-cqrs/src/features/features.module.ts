import { BookModule } from '@/features/book/book.module'
import { MovieModule } from '@/features/movie/movie.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [BookModule, MovieModule]
})
export class FeaturesModule {}
