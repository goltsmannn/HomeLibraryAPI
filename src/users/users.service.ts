import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { CustomError } from '../errors/CustomError';
import { isUUID } from 'class-validator';
import 'uuid';
import { PrismaClient } from '@prisma/client';
import prisma from '../../singleton';

@Injectable()
export class UsersService {

  async getAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true
      },
    });
  }

  async getById(id: string) {
    if (!isUUID(id)) {
      throw new CustomError('Invalid user ID', 400);
    }
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true
      },    });

    if (user == null) {
      throw new CustomError('User not found', 404);
    }
    return user;
  }

  async create(user: CreateUserDto) {
    return prisma.user.upsert({
      update: {},
      create: {
        id: User.generateId(),
        login: user.login,
        password: user.password,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      where: { login: user.login },
    });
  }

  async update(id: string, password: UpdatePasswordDto) {
    if (!isUUID(id)) {
      throw new CustomError('Invalid user ID', 400);
    }
    const user = await prisma.user.update({
      data: {
        password: password.newPassword,
        updatedAt: new Date(),
        version: {
          increment: 1,
        },
      },
      where: {
        id: id,
        password: password.oldPassword
      }
    });
    if (!user) {
      throw new CustomError('User with given credentials not found', 404);
    }
    return user;
  }

  async delete(id: string) {
    if (!isUUID(id)) {
      throw new CustomError('Invalid user ID', 400);
    }
    const user = await prisma.user.delete({
      where: { id: id },
    });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
  }
}
