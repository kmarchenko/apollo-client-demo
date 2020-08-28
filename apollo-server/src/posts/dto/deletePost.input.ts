import { Field, InputType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeletePostInput {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
