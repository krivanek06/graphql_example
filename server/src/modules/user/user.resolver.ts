import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MovieComment } from '../movie-comment/movie-comment.model';
import { MovieCommentService } from '../movie-comment/movie-comment.service';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
	constructor(private movieCommentService: MovieCommentService, private userService: UserService) {}

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
}
