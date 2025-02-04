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


@Controller('user')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    const response = await this.userService.getAll();
    return response;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {

    try {
      const user = await this.userService.getById(id);
      return user;
    } catch (err) {
        throw new HttpException({
          status: err.statusCode,
          error: err.message,
        }, err.statusCode);
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto)
      .catch((err) => {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: "User already exists or invalid data",
        }, HttpStatus.BAD_REQUEST);
    });
  }


  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userService.update(id, updatePasswordDto);
    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userService.delete(id)
      .catch (err => {
      throw new HttpException({
        status: err.statusCode,
        error: err.message,
      }, err.statusCode);
    });
  }

}
