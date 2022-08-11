import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MovieCommentModule } from '../movie-comment/movie-comment.module';
import { UserModule } from '../user/user.module';
import { MovieCommentLikeResolver } from './movie-comment-like.resolver';
import { MovieCommentLikeService } from './movie-comment-like.service';

@Module({
	imports: [forwardRef(() => MovieCommentModule), forwardRef(() => UserModule)],
	providers: [PrismaService, MovieCommentLikeService, MovieCommentLikeResolver],
	exports: [MovieCommentLikeService, MovieCommentLikeResolver],
})
export class MovieCommentLikeModule {}
