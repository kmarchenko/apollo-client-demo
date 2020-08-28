import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Post } from './post.model';
import { CreatePostInput } from './dto/createPost.input';
import { UpdatePostInput } from './dto/updatePost.input';
import { DeletePostInput } from './dto/deletePost.input';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  create(data: CreatePostInput): Post {
    const post = {
      id: uuidv4() as string,
      ...data,
    };
    this.posts.push(post);
    return post;
  }

  update({ id, ...data }: UpdatePostInput): Post {
    const index = this.posts.findIndex(x => x.id === id);
    this.posts[index] = {
      ...this.posts[index],
      ...data,
    };
    return this.posts[index];
  }

  delete({ id }: DeletePostInput): Post {
    const post = this.findById(id);
    this.posts = this.posts.filter(x => x !== post);
    return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findByUser(userId: string): Post[] {
    return this.posts.filter(x => x.user === userId);
  }

  findById(id: string): Post {
    return this.posts.find(x => x.id === id);
  }
}
