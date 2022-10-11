import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MovieComment as MovieCommentClient } from '@prisma/client';

@ObjectType()
export class MovieComment implements MovieCommentClient {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	createdAt: Date;

	@Field(() => String, {
		nullable: true,
		description: 'Comment that was added',
		defaultValue: '',
	})
	description: string;

	@Field(() => Number, {
		description: 'How many likes a Movie has',
	})
	likes: number;

	@Field(() => Number)
	movieId: number;

	@Field(() => Number)
	userId: number;
}
