import * as faker from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { MovieInput } from 'src/movie/movie.input';
import { UserInput } from 'src/user/user.input';

const prisma = new PrismaClient();

const createManyMovies = async () => {
  if ((await prisma.movie.count()) === 0) {
    for (let i = 0; i < 100; i++) {
      // create data
      const movie: MovieInput = {
        title: faker.faker.name.findName(),
        description: faker.faker.random.words(6),
      };

      // insert to DB
      await prisma.movie.create({
        data: {
          ...movie,
        },
      });
    }
  }
};

const createManyUsers = async () => {
  if ((await prisma.user.count()) === 0) {
    for (let i = 0; i < 100; i++) {
      // create data
      const user: UserInput = {
        username: faker.faker.name.findName(),
        description: faker.faker.random.words(6),
      };

      // insert to DB
      await prisma.user.create({
        data: {
          ...user,
        },
      });
    }
  }
};

const run = async () => {
  const prisma = new PrismaClient();
  try {
    await createManyMovies();
    await createManyUsers();
  } finally {
    await prisma.$disconnect();
  }
};

run();
