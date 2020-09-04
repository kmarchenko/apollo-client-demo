import { Field, Int } from '@nestjs/graphql';
import { ConnectionFilterArgsType } from 'nestjs-graphql-pagination';

@ConnectionFilterArgsType()
export class GetUsersArgs {
  @Field(() => Int, { nullable: true })
  first: number;

  @Field({ nullable: true })
  after: string;

  @Field(() => Int, { nullable: true })
  last: number;

  @Field({ nullable: true })
  before: string;
}
