import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MovieCommentLike as MovieCommentLikeClient } from '@prisma/client';

@ObjectType()
export class MovieCommentLike implements MovieCommentLikeClient {
	@Field(() => Int)
	id: number;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Int, {
		nullable: false,
		description: 'User who liked the comment',
	})
	userId: number;

	@Field(() => Int, {
		nullable: false,
		description: 'Comment that was liked',
	})
	movieCommentId: number;
}
