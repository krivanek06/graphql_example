import { forwardRef, Module } from '@nestjs/common';
import { MovieCommentLikeModule } from 'src/movie-comment-like/movie-comment-like.module';

@Module({
  imports: [forwardRef(() => MovieCommentLikeModule)],
})
export class MovieCommentModule {}
