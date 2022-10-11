import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MovieCommentModule } from '../movie-comment/movie-comment.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
	imports: [forwardRef(() => MovieCommentModule)],
	providers: [PrismaService, UserService, UserResolver],
	exports: [UserService, UserResolver],
})
export class UserModule {}
