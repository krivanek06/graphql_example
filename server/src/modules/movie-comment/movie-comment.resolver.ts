import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MovieCommentLike } from '../movie-comment-like/movie-comment-like.model';
import { MovieCommentLikeService } from '../movie-comment-like/movie-comment-like.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
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

	@Mutation(() => MovieComment)
	async createMovieComment(@Args('movieCommentInput') movieCommentInput: MovieCommentInput): Promise<MovieComment> {
		return this.movieCommentService.createMovieComment(movieCommentInput);
	}

	@ResolveField('likedBy', () => [MovieCommentLike])
	async getCommentLikedBy(@Parent() movieComment: MovieComment) {
		const { id } = movieComment;
		return this.movieCommentLikeService.getAllMovieCommetLikeByMovieCommentId(id);
	}

	@ResolveField('likeCount', () => Number)
	async getCommentLikedCount(@Parent() movieComment: MovieComment) {
		const { id } = movieComment;
		return this.movieCommentLikeService.getCommentLikedCount(id);
	}

	@ResolveField('user', () => User)
	async getUserThatLikedTheComment(@Parent() movieComment: MovieComment): Promise<User> {
		const { userId } = movieComment;
		return this.userService.getUserById(userId);
	}
}
