import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '../posts/post.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Post])
  posts?: Post[];
}
