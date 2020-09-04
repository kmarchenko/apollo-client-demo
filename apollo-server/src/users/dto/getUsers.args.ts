import { ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from '../../common/pagination/pagination.args';

@ArgsType()
export class GetUsersArgs extends PaginationArgs {}
