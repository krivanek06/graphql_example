import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { MovieCommentResolver } from './movie-comment.resolver';
import { MovieCommentService } from './movie-comment.service';

@Module({
	imports: [forwardRef(() => UserModule)],
	providers: [PrismaService, MovieCommentService, MovieCommentResolver],
	exports: [MovieCommentService, MovieCommentResolver],
})
export class MovieCommentModule {}
