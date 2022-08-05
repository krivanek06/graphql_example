import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MovieCommentLikeInput {
  @Field(() => Number, {
    nullable: false,
    description: 'Comment that has been liked',
  })
  movieCommentId: number;

  @Field(() => Number, {
    nullable: false,
    description: 'User who liked the coment',
  })
  userId: number;
}
