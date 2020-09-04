import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/pagination/paginated';
import { User } from '../user.model';

@ObjectType()
export class PaginatedUsers extends Paginated<User>(User) {}
