import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/providers/redis/redisPubSub.module';
import { MovieComment } from './../movie-comment/movie-comment.model';
import { MovieCommentService } from './../movie-comment/movie-comment.service';
import { MovieInput } from './movie.input';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Resolver(() => Movie)
export class MovieResolver {
	constructor(
		private movieService: MovieService,
		private movieCommentService: MovieCommentService,
		@Inject(PUB_SUB) private pubSub: RedisPubSub
	) {}

	@Query(() => [Movie], {
		description: 'we return multiple movies',
		name: 'getAllMovies',
		nullable: false,
		defaultValue: [],
	})
	async getAllMovies(): Promise<Movie[]> {
		return this.movieService.getAllMovies();
	}

	@Query(() => Movie)
	async getMovieById(@Args('id', { type: () => Int }) id: number): Promise<Movie> {
		return this.movieService.getMovieById(id);
	}

	@Mutation(() => Movie)
	async createMovie(@Args('movieInput') movieInput: MovieInput): Promise<Movie> {
		const createdMovie = await this.movieService.createMovie(movieInput);
		this.pubSub.publish('createdMovie', { createdMovie });
		return createdMovie;
	}

	@Subscription(() => Movie)
	createdMovie() {
		return this.pubSub.asyncIterator('createdMovie');
	}

	@ResolveField('movieComment', () => [MovieComment])
	async getMovieComment(@Parent() movie: Movie) {
		const { id } = movie;
		return this.movieCommentService.getAllMovieCommetsByMovieId(id);
	}
}
