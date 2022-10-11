import * as faker from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

interface MovieInputCreate {
	title: string;
	description?: string;
}

interface UserInput {
	username: string;
	description?: string;
}

interface MovieCommentLikeInput {
	movieCommentId: number;
	userId: number;
}

interface MovieCommentInput {
	description: string;
	movieId: number;
	userId: number;
}

const prisma = new PrismaClient();
const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createManyMovies = async () => {
	if ((await prisma.movie.count()) !== 0) {
		return;
	}

	for (let i = 0; i < 100; i++) {
		// create data
		const movie: MovieInputCreate = {
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
};

const createManyUsers = async () => {
	if ((await prisma.user.count()) !== 0) {
		return;
	}

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
};

const createManyCommentsOnMovies = async () => {
	if ((await prisma.movieComment.count()) !== 0) {
		return;
	}

	const allMovies = await prisma.movie.findMany();
	const allUsers = await prisma.user.findMany();

	for await (const movie of allMovies) {
		const randomLoop = getRandomInt(5, 25);
		// add N comments to each movie
		for (let i = 0; i < randomLoop; i++) {
			const randomUserId = getRandomInt(0, allUsers.length - 1);
			const user = allUsers[randomUserId];

			// create model
			const comment: MovieCommentInput = {
				description: faker.faker.random.words(6),
				userId: user.id,
				movieId: movie.id,
			};

			// insert model into DB
			await prisma.movieComment.create({
				data: {
					...comment,
					likes: getRandomInt(2, 8),
				},
			});
		}
	}
};

const run = async () => {
	const prisma = new PrismaClient();
	try {
		console.log('createManyMovies() -> start');
		await createManyMovies();
		console.log('createManyMovies() -> done');

		console.log('createManyUsers() -> start');
		await createManyUsers();
		console.log('createManyUsers() -> done');

		console.log('createManyCommentsOnMovies() -> start');
		await createManyCommentsOnMovies();
		console.log('createManyCommentsOnMovies() -> done');
	} finally {
		await prisma.$disconnect();
	}
};

run();
