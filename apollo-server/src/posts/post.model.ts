import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user.model';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field(() => User)
  user: string;
}
