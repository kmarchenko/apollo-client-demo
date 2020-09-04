import { NotFoundException } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { DeleteUserInput } from './dto/deleteUser.input';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';

import { GetUsersArgs } from './dto/getUsers.args';
import { PaginatedUsers } from './dto/paginatedUsers.dto';

const pubsub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => PaginatedUsers)
  users(@Args() args: GetUsersArgs): PaginatedUsers {
    return this.usersService.findAll(args.before, args.after, args.limit);;
  }

  @Query(() => User)
  user(@Args('id') id: string): User {
    const user = this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Mutation(() => User)
  createUser(@Args('input') data: CreateUserInput): User {
    if (this.usersService.findByName(data.name)) {
      throw new Error('User already exists');
    }
    const user = this.usersService.create(data);
    pubsub.publish('onUserCreated', { onUserCreated: user });
    return user;
  }

  @Mutation(() => User)
  updateUser(@Args('input') data: UpdateUserInput): User {
    const user = this.usersService.findById(data.id);
    if (!user) {
      throw new NotFoundException(data.id);
    }
    return this.usersService.update(data);
  }

  @Mutation(() => User)
  deleteUser(@Args('input') data: DeleteUserInput): User {
    const user = this.usersService.findById(data.id);
    if (!user) {
      throw new NotFoundException(data.id);
    }
    return this.usersService.delete(data);
  }

  @Subscription(() => User)
  onUserCreated() {
    return pubsub.asyncIterator('onUserCreated');
  }

  @ResolveField('posts', () => [Post])
  getPosts(@Parent() user: User): Post[] {
    return this.postsService.findByUser(user.id);
  }
}
