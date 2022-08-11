import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MovieCommentLike } from 'src/movie-comment-like/movie-comment-like.model';
import { MovieCommentLikeService } from 'src/movie-comment-like/movie-comment-like.service';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { MovieComment } from './../movie-comment/movie-comment.model';
import { MovieCommentInput } from './movie-comment.input';
import { MovieCommentService } from './movie-comment.service';

@Resolver(() => MovieComment)
export class MovieCommentResolver {
	constructor(
		private movieCommentLikeService: MovieCommentLikeService,
		private movieCommentService: MovieCommentService,
		private userService: UserService
	) {}

	@ResolveField('likedBy', () => [MovieCommentLike])
	async getCommentLikedBy(@Parent() movieComment: MovieComment) {
		const { id } = movieComment;
		return this.movieCommentLikeService.getAllMovieCommetLikeByMovieCommentId(id);
	}

	@Mutation(() => MovieComment)
	async createMovieComment(@Args('movieCommentInput') movieCommentInput: MovieCommentInput): Promise<MovieComment> {
		return this.movieCommentService.createMovieComment(movieCommentInput);
	}

	@ResolveField('user', () => User)
	async getUserThatLikedTheComment(@Parent() movieComment: MovieComment): Promise<User> {
		const { userId } = movieComment;
		return this.userService.getUserById(userId);
	}
}
