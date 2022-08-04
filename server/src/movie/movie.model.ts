import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

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
