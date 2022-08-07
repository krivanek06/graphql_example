import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
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

  getAllMovieCommentsByUserId(userId: number): Promise<MovieComment[]> {
    return this.prisma.movieComment.findMany({
      where: {
        userId,
      },
    });
  }
}
