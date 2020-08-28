import { Field, InputType, ID } from '@nestjs/graphql';
import { Length, IsUUID } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @Length(4, 100)
  text: string;
}
