import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Movie as MovieClient } from '@prisma/client';

@ObjectType()
export class Movie implements MovieClient {
	@Field(() => ID)
	id: number;

	@Field(() => String)
	createdAt: Date;

	@Field(() => String)
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
