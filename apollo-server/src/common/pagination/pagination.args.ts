import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => String)
  before = null;

  @Field(() => String)
  after = null;

  @Field(() => Int)
  limit = 10;
}
