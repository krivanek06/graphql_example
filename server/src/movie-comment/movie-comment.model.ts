import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MovieComment as MovieCommentClient } from '@prisma/client';

@ObjectType()
export class MovieComment implements MovieCommentClient {
	@Field(() => Int)
	id: number;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => String, {
		nullable: true,
		description: 'Comment that was added',
	})
	description: string;

	@Field(() => Number)
	movieId: number;

	@Field(() => Number)
	userId: number;
}
