import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User as UserClient } from '@prisma/client';

@ObjectType()
export class User implements UserClient {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	createdAt: Date;

	@Field(() => String, {
		nullable: true,
		description: "Description to user's usernaem",
		defaultValue: '',
	})
	description: string;

	@Field(() => String)
	username: string;
}
