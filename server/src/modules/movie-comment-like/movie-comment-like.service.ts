import { Injectable } from '@nestjs/common';
import { MovieCommentLike } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MovieCommentLikeService {
	constructor(private prisma: PrismaService) {}

	async getAllMovieCommetLikeByMovieCommentId(movieCommentId: number): Promise<MovieCommentLike[]> {
		return this.prisma.movieCommentLike.findMany({
			where: {
				movieCommentId,
			},
		});
	}

	async getAllMovieCommetLikeByUserId(userId: number): Promise<MovieCommentLike[]> {
		return this.prisma.movieCommentLike.findMany({
			where: {
				userId,
			},
		});
	}
}
