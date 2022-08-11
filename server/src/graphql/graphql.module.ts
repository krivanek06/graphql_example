import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MovieCommentLikeModule } from 'src/modules/movie-comment-like/movie-comment-like.module';
import { MovieCommentModule } from 'src/modules/movie-comment/movie-comment.module';
import { MovieModule } from 'src/modules/movie/movie.module';
import { UserModule } from 'src/modules/user/user.module';
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
