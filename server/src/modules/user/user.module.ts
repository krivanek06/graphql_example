import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MovieCommentLikeModule } from '../movie-comment-like/movie-comment-like.module';
import { MovieCommentModule } from '../movie-comment/movie-comment.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
	imports: [forwardRef(() => MovieCommentModule), forwardRef(() => MovieCommentLikeModule)],
	providers: [PrismaService, UserService, UserResolver],
	exports: [UserService, UserResolver],
})
export class UserModule {}
