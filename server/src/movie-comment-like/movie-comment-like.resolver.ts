import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MovieCommentLike } from 'src/movie-comment-like/movie-comment-like.model';
import { MovieCommentService } from 'src/movie-comment/movie-comment.service';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { MovieComment } from './../movie-comment/movie-comment.model';

@Resolver(() => MovieCommentLike)
export class MovieCommentLikeResolver {
	constructor(private movieCommentService: MovieCommentService, private userService: UserService) {}

	@ResolveField('movieComment', () => MovieComment)
	async getCommentThatWasLiked(@Parent() movieCommentLike: MovieCommentLike): Promise<MovieComment> {
		const { movieCommentId } = movieCommentLike;
		return this.movieCommentService.getMovieCommetById(movieCommentId);
	}

	@ResolveField('user', () => User)
	async getUserThatLikedTheComment(@Parent() movieCommentLike: MovieCommentLike): Promise<User> {
		const { userId } = movieCommentLike;
		return this.userService.getUserById(userId);
	}
}
