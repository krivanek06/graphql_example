import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/providers/redis/redisPubSub.module';
import { delayCode } from 'src/utils/helpers.model';
import { MovieComment } from './../movie-comment/movie-comment.model';
import { MovieCommentService } from './../movie-comment/movie-comment.service';
import { MovieInputCreate, MovieInputEdit } from './movie.input';
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

	/* ******************** */

	@Mutation(() => Movie)
	async createMovie(@Args('movieInputCreate') movieInputCreate: MovieInputCreate): Promise<Movie> {
		const createdMovie = await this.movieService.createMovie(movieInputCreate);
		await delayCode(3000); // delay execution by 3 seconds
		this.pubSub.publish('createdMovie', { createdMovie });
		return createdMovie;
	}

	@Mutation(() => Movie)
	async editMovie(@Args('movieInputEdit') movieInputEdit: MovieInputEdit): Promise<Movie> {
		const editedMovie = await this.movieService.editMovie(movieInputEdit);
		this.pubSub.publish('editedMovie', { editedMovie });
		return editedMovie;
	}

	@Mutation(() => Number)
	async deleteMovie(@Args('movieId', { type: () => Int }) movieId: number): Promise<number> {
		await this.movieService.deleteMovie(movieId);
		this.pubSub.publish('deletedMovie', { movieId });
		return movieId;
	}

	/* ******************** */

	@Subscription(() => Movie)
	createdMovie() {
		return this.pubSub.asyncIterator('createdMovie');
	}

	@Subscription(() => Movie)
	editedMovie() {
		return this.pubSub.asyncIterator('editedMovie');
	}

	@Subscription(() => Number)
	deletedMovie() {
		return this.pubSub.asyncIterator('deletedMovie');
	}

	/* ******************** */

	@ResolveField('movieComment', () => [MovieComment])
	async getMovieComment(@Parent() movie: Movie) {
		const { id } = movie;
		return this.movieCommentService.getAllMovieCommetsByMovieId(id);
	}

	@ResolveField('movieCommentCount', () => Number)
	async getMovieCommetsCountByMovieId(@Parent() movie: Movie) {
		const { id } = movie;
		return this.movieCommentService.getMovieCommetsCountByMovieId(id);
	}
}
