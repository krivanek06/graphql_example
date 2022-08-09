import { Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async getAllMovies(): Promise<Movie[]> {
		return this.prisma.movie.findMany();
	}

	async getMovieById(id: number): Promise<Movie> {
		return this.prisma.movie.findFirstOrThrow({
			where: {
				id,
			},
		});
	}
}
