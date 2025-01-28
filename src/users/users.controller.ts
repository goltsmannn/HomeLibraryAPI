import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { UsersService } from './users.service';
import { CustomError } from './errors/UserErrors';
import { isUUID } from 'class-validator';

@Controller('user')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    try {
      return this.userService.getById(id);
    } catch (err: any) {
      throw new HttpException({
        status: err.statusCode,
        error: err.message,
      }, err.statusCode);
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      this.userService.create(createUserDto);
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "User already exists or invalid data",
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    try {
      this.userService.update(id, updatePasswordDto);
    } catch (err) {
      throw new HttpException({
        status: err.statusCode,
        error: err.message,
      }, err.statusCode);
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    try {
      this.userService.delete(id);
    } catch (err) {
      throw new HttpException({
        status: err.statusCode,
        error: err.message,
      }, err.statusCode);
    }
  }

}
