import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User as UserClient } from '@prisma/client';

@ObjectType()
export class User implements UserClient {
	@Field(() => Int)
	id: number;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => String, {
		nullable: true,
		description: "Description to user's usernaem",
	})
	description: string;

	@Field(() => String)
	username: string;
}
