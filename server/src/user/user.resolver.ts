import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MovieCommentLike } from 'src/movie-comment-like/movie-comment-like.model';
import { MovieCommentLikeService } from 'src/movie-comment-like/movie-comment-like.service';
import { MovieComment } from 'src/movie-comment/movie-comment.model';
import { MovieCommentService } from 'src/movie-comment/movie-comment.service';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
	constructor(
		private movieCommentService: MovieCommentService,
		private movieCommentLikeService: MovieCommentLikeService,
		private userService: UserService
	) {}

	@Query(() => User)
	async getUserById(@Args('id', { type: () => Int }) id: number): Promise<User> {
		return this.userService.getUserById(id);
	}

	@Query(() => [User])
	async getAllUsers(): Promise<User[]> {
		return this.userService.getAllUsers();
	}

	@ResolveField('movieCommentsUserLeft', () => [MovieComment])
	async getMovieCommentsThatUserWritten(@Parent() user: User): Promise<MovieComment[]> {
		const { id } = user;
		return this.movieCommentService.getAllMovieCommentsByUserId(id);
	}

	@ResolveField('movieCommentsUserLiked', () => [MovieCommentLike])
	async getUserThatLikedTheComment(@Parent() user: User): Promise<MovieCommentLike[]> {
		const { id } = user;
		return this.movieCommentLikeService.getAllMovieCommetLikeByUserId(id);
	}
}
