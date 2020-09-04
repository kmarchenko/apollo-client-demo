import { Injectable } from '@nestjs/common';
import * as Chance from 'chance';
import { v4 as uuidv4 } from 'uuid';
import { Base64 } from 'js-base64';
import { User } from './user.model';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { DeleteUserInput } from './dto/deleteUser.input';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    const chance = new Chance();
    for (let i = 0; i < 100; i++) {
      this.users.push({
        id: (i + 1).toString(),
        name: chance.name(),
      });
    }
  }

  create(data: CreateUserInput): User {
    const user = {
      id: uuidv4() as string,
      ...data,
    };
    this.users.push(user);
    return user;
  }

  update({ id, ...data }: UpdateUserInput): User {
    const index = this.users.findIndex(x => x.id === id);
    this.users[index] = {
      ...this.users[index],
      ...data,
    };
    return this.users[index];
  }

  delete({ id }: DeleteUserInput): User {
    const user = this.findById(id);
    this.users = this.users.filter(x => x !== user);
    return user;
  }

  getUsersCount() {
    return this.users.length;
  }

  findAll(before?: string, after?: string, limit = 10): any {
    if (limit <= 0) limit = 1;
    if (limit >= 100) limit = 100;
    let items = this.users.slice(0, limit);
    if (before) {
      const decodedBefore = parseInt(Base64.decode(before));
      const users = this.users.filter(user => parseInt(user.id) < decodedBefore);
      items = users.slice(users.length - limit, users.length);
    } else if (after) {
      const decodedAfter = parseInt(Base64.decode(after));
      const users = this.users.filter(user => parseInt(user.id) > decodedAfter);
      items = users.slice(0, limit);
    }
    const hasPrev = items.length && items[0].id !== this.users[0].id;
    const hasNext = items.length && items[items.length - 1].id !== this.users[this.users.length - 1].id;
    return {
      items,
      cursor: {
        before: hasPrev ? Base64.encode(items[0].id) : null,
        after:  hasNext ? Base64.encode(items[items.length - 1].id) : null,
        hasPrev,
        hasNext,
      },
    };
  }

  findById(id: string): User {
    return this.users.find(x => x.id === id);
  }

  findByName(name: string): User {
    return this.users.find(x => x.name === name);
  }
}
