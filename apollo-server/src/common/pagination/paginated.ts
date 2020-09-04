import { ObjectType, Field } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class Cursor {
    @Field(() => String, { nullable: true })
    before: string;

    @Field(() => String, { nullable: true })
    after: string;

    @Field(() => Boolean)
    hasPrev: boolean;

    @Field(() => Boolean)
    hasNext: boolean;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    items: T[];

    @Field(() => Cursor)
    cursor: Cursor;
  }
  return PaginatedType;
}
