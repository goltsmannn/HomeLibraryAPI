import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { CustomError } from './errors/UserErrors';
import { isUUID } from 'class-validator';
import 'uuid';
import { plainToClass, plainToInstance } from 'class-transformer';


@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll() {
    return plainToInstance(User, this.users);
  }

  getById(id: string) {
    if(!isUUID(id)) {
      throw new CustomError('Invalid user ID', 400);
    }
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return plainToInstance(User, user);
  }

  create(user: CreateUserDto) {
    for(const u of this.users) {
      if (u.login === user.login) {
        throw new CustomError('User already exists', 400);
      }
    }

    this.users.push({
      id: User.generateId(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  update(id: string, password: UpdatePasswordDto) {
    if(!isUUID(id)) {
      throw new CustomError('Invalid user ID', 400);
    }
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    if(user.password !== password.oldPassword) {
      throw new CustomError('Invalid password', 403);
    }

    user.password = password.newPassword;
    user.updatedAt = Date.now();
    user.version++;
  }

  delete(id: string) {
    if(!isUUID(id)) {
      throw new CustomError('Invalid user ID', 400);
    }
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    this.users = this.users.filter(user => user.id !== id);
  }


}
