import {
  ConnectionEdgeObjectType,
  ConnectionObjectType,
} from 'nestjs-graphql-pagination';
import { User } from '../user.model';

@ConnectionEdgeObjectType(User)
export class UserEdge {}

@ConnectionObjectType(UserEdge)
export class UserConnection {}
