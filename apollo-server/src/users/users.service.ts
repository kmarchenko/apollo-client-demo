import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { DeleteUserInput } from './dto/deleteUser.input';

@Injectable()
export class UsersService {
  private users: User[] = [];

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

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    return this.users.find(x => x.id === id);
  }

  findByName(name: string): User {
    return this.users.find(x => x.name === name);
  }
}
