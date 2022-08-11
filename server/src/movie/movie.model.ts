import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Movie as MovieClient } from '@prisma/client';

@ObjectType()
export class Movie implements MovieClient {
	@Field(() => ID)
	id: number;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	@Field(() => String, {
		nullable: false,
		description: "User's title to the movie",
		defaultValue: '',
	})
	title: string;

	@Field(() => String, {
		nullable: true,
		description: "User's description to the movie",
	})
	description: string;
}
