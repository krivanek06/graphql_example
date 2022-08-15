import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MovieInputCreate {
	@Field(() => String, {
		nullable: false,
		description: "User's title to the movie",
	})
	title: string;

	@Field(() => String, {
		nullable: true,
		description: "User's description to the movie",
	})
	description?: string;
}

@InputType()
export class MovieInputEdit {
	@Field(() => Number)
	id: number;

	@Field(() => String, {
		nullable: false,
		description: "User's title to the movie",
	})
	title: string;

	@Field(() => String, {
		nullable: true,
		description: "User's description to the movie",
	})
	description?: string;
}
