import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MovieCommentLike {
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
