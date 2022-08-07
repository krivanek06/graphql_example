import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String, {
    nullable: true,
    description: "Description to user's usernaem",
  })
  description?: string;

  @Field(() => String)
  username: string;
}
