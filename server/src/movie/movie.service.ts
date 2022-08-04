import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { Movie } from './movie.model';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async getAllMovies(): Promise<Movie[]> {
    return this.prisma.mo;
  }
}
