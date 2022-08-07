import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MovieCommentLike } from './movie-comment-like.model';

@Injectable()
export class MovieCommentLikeService {
  constructor(private prisma: PrismaService) {}

  async getAllMovieCommetLikeByMovieCommentId(
    movieCommentId: number,
  ): Promise<MovieCommentLike[]> {
    return this.prisma.movieCommentLike.findMany({
      where: {
        movieCommentId,
      },
    });
  }

  async getAllMovieCommetLikeByUserId(
    userId: number,
  ): Promise<MovieCommentLike[]> {
    return this.prisma.movieCommentLike.findMany({
      where: {
        userId,
      },
    });
  }
}
