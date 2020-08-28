import { Field, InputType, ID } from '@nestjs/graphql';
import { Length, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @Length(1, 100)
  text: string;

  @Field(() => ID)
  @IsUUID()
  user: string;
}
