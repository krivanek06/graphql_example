import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie as MovieClient } from '@prisma/client';

@ObjectType()
export class Movie implements MovieClient {
	@Field(() => Int)
	id: number;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	@Field(() => String, {
		nullable: false,
		description: "User's title to the movie",
	})
	title: string;

	@Field(() => String, {
		nullable: true,
		description: "User's description to the movie",
	})
	description: string;
}
