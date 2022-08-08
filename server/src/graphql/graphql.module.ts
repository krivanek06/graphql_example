import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MovieCommentLikeModule } from 'src/movie-comment-like/movie-comment-like.module';
import { MovieCommentModule } from 'src/movie-comment/movie-comment.module';
import { MovieModule } from 'src/movie/movie.module';
import { UserModule } from 'src/user/user.module';
import { GraphQLHelper } from './graphql.helper';
import { GraphQLResolver } from './graphql.resolver';

@Module({
	imports: [
		ConfigModule,
		GraphQLModule.forRoot<ApolloDriverConfig>(GraphQLHelper.getApolloDriverConfig()),
		// modules
		MovieModule,
		UserModule,
		MovieCommentModule,
		MovieCommentLikeModule,
	],
	providers: [GraphQLResolver],
})
export class GraphQLBackendModule {}
