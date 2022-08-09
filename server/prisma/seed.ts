import * as faker from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { MovieCommentInput } from 'src/movie-comment/movie-comment.input';
import { MovieInput } from 'src/movie/movie.input';
import { UserInput } from 'src/user/user.input';
import { MovieCommentLikeInput } from './../src/movie-comment-like/movie-comment-like.input';

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
				},
			});
		}
	}
};

const createManyCommentLikesOnComments = async () => {
	if ((await prisma.movieCommentLike.count()) !== 0) {
		return;
	}

	const allUsers = await prisma.user.findMany();
	const allComments = await prisma.movieComment.findMany();

	for await (const comment of allComments) {
		const randomLoop = getRandomInt(2, 5);
		// add N likes to each comment
		for (let i = 0; i < randomLoop; i++) {
			const randomUserId = getRandomInt(0, allUsers.length - 1);
			const user = allUsers[randomUserId];

			// create model
			const commentLike: MovieCommentLikeInput = {
				userId: user.id,
				movieCommentId: comment.id,
			};

			// insert model into DB
			await prisma.movieCommentLike.create({
				data: {
					...commentLike,
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

		console.log('createManyCommentLikesOnComments() -> start');
		await createManyCommentLikesOnComments();
		console.log('createManyCommentLikesOnComments() -> done');
	} finally {
		await prisma.$disconnect();
	}
};

run();
