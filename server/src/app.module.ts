import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { MovieCommentModule } from './movie-comment/movie-comment.module';
import { MovieCommentLikeModule } from './movie-comment-like/movie-comment-like.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),
    MovieModule,
    UserModule,
    MovieCommentModule,
    MovieCommentLikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
