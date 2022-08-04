import { forwardRef, Module } from '@nestjs/common';
import { MovieCommentModule } from 'src/movie-comment/movie-comment.module';

@Module({
  imports: [forwardRef(() => MovieCommentModule)],
})
export class MovieModule {}
