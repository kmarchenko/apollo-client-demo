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

  findAll(before?: string, after?: string, first = 10, last = 10): any {
    if (first <= 0) first = 1;
    if (first >= 100) first = 100;
    if (last <= 0) last = 1;
    if (last >= 100) last = 100;
    let items = this.users.slice(0, first);
    if (before) {
      const decodedBefore = parseInt(Base64.decode(before));
      const users = this.users.filter(
        user => parseInt(user.id) < decodedBefore,
      );
      items = users.slice(users.length - last, users.length);
    } else if (after) {
      const decodedAfter = parseInt(Base64.decode(after));
      const users = this.users.filter(user => parseInt(user.id) > decodedAfter);
      items = users.slice(0, first);
    }
    const hasPrev = items.length && items[0].id !== this.users[0].id;
    const hasNext =
      items.length &&
      items[items.length - 1].id !== this.users[this.users.length - 1].id;
    return {
      edges: items.map(item => ({
        node: item,
        cursor: Base64.encode(item.id),
      })),
      pageInfo: {
        startCursor: Base64.encode(hasPrev ? items[0].id : this.users[0].id),
        endCursor: Base64.encode(hasNext ? items[items.length - 1].id : this.users[this.users.length - 1].id),
        hasPreviousPage: hasPrev,
        hasNextPage: hasNext,
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
