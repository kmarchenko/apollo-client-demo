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
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/createPost.input';
import { UpdatePostInput } from './dto/updatePost.input';
import { DeletePostInput } from './dto/deletePost.input';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';

const pubsub = new PubSub();

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Post])
  posts(): Post[] {
    return this.postsService.findAll();
  }

  @Query(() => Post)
  post(@Args('id') id: string): Post {
    const post = this.postsService.findById(id);
    if (!post) {
      throw new NotFoundException(id);
    }
    return post;
  }

  @Mutation(() => Post)
  createPost(@Args('input') data: CreatePostInput): Post {
    const post = this.postsService.create(data);
    pubsub.publish('onPostCreated', { onPostCreated: post });
    return post;
  }

  @Mutation(() => Post)
  updatePost(@Args('input') data: UpdatePostInput): Post {
    const post = this.postsService.findById(data.id);
    if (!post) {
      throw new NotFoundException(data.id);
    }
    return this.postsService.update(data);
  }

  @Mutation(() => Post)
  deletePost(@Args('input') data: DeletePostInput): Post {
    const post = this.postsService.findById(data.id);
    if (!post) {
      throw new NotFoundException(data.id);
    }
    return this.postsService.delete(data);
  }

  @Subscription(() => Post)
  onPostCreated() {
    return pubsub.asyncIterator('onPostCreated');
  }

  @ResolveField('user', () => User)
  getUser(@Parent() post: Post): User {
    return this.usersService.findById(post.user);
  }
}
