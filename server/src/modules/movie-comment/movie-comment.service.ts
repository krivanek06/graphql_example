import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MovieCommentInput } from './movie-comment.input';
import { MovieComment } from './movie-comment.model';

@Injectable()
export class MovieCommentService {
	constructor(private prisma: PrismaService) {}

	async getAllMovieCommetsByMovieId(movieId: number): Promise<MovieComment[]> {
		return this.prisma.movieComment.findMany({
			where: {
				movieId,
			},
		});
	}

	async getMovieCommetById(id: number): Promise<MovieComment> {
		return this.prisma.movieComment.findUniqueOrThrow({
			where: {
				id,
			},
		});
	}

	async createMovieComment(movieCommentInput: MovieCommentInput): Promise<MovieComment> {
		return this.prisma.movieComment.create({
			data: {
				movieId: movieCommentInput.movieId,
				userId: movieCommentInput.userId,
				description: movieCommentInput.description,
			},
		});
	}

	async getAllMovieCommentsByUserId(userId: number): Promise<MovieComment[]> {
		return this.prisma.movieComment.findMany({
			where: {
				userId,
			},
		});
	}
}
