import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
	@Field(() => String, {
		nullable: false,
		description: "User's name that will be visible",
	})
	username: string;

	@Field(() => String, {
		nullable: true,
		description: "User's description",
	})
	description?: string;
}
