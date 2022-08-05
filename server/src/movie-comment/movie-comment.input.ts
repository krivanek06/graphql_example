import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MovieCommentInput {
  @Field(() => String, {
    nullable: false,
    description: "User's description",
  })
  description: string;

  @Field(() => Number, {
    nullable: false,
    description: 'Movie which was commented',
  })
  movieId: number;

  @Field(() => Number, {
    nullable: false,
    description: 'User who wrote the comment',
  })
  userId: number;
}
