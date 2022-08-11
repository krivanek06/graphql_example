import { Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { MovieInput } from './movie.input';

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

	async createMovie(movieInpu: MovieInput): Promise<Movie> {
		return this.prisma.movie.create({
			data: {
				title: movieInpu.title,
				description: movieInpu.description,
			},
		});
	}
}
