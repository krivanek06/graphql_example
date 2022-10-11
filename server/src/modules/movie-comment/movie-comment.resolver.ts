import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { MovieComment } from './../movie-comment/movie-comment.model';
import { MovieCommentInput } from './movie-comment.input';
import { MovieCommentService } from './movie-comment.service';

@Resolver(() => MovieComment)
export class MovieCommentResolver {
	constructor(private movieCommentService: MovieCommentService, private userService: UserService) {}

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
