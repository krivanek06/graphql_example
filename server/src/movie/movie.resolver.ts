import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MovieComment } from './../movie-comment/movie-comment.model';
import { MovieCommentService } from './../movie-comment/movie-comment.service';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Resolver(() => Movie)
export class MovieResolver {
	constructor(private movieService: MovieService, private movieCommentService: MovieCommentService) {}

	@Query(() => [Movie])
	async getAllMovies(): Promise<Movie[]> {
		return this.movieService.getAllMovies();
	}

	@Query(() => Movie)
	async getMovieById(@Args('id', { type: () => Int }) id: number): Promise<Movie> {
		return this.movieService.getMovieById(id);
	}

	@ResolveField('movieComment', () => [MovieComment])
	async getMovieComment(@Parent() movie: Movie) {
		const { id } = movie;
		return this.movieCommentService.getAllMovieCommetsByMovieId(id);
	}
}
