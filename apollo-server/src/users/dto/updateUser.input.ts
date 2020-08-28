import { Field, InputType, ID } from '@nestjs/graphql';
import { Length, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @Length(4, 10)
  name: string;
}
