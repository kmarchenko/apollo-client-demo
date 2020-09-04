import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    items: T[];

    @Field(() => Int)
    offset: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    totalCount: number;
  }
  return PaginatedType;
}
