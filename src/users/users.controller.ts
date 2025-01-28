import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUser(): string {
    return 'One user';
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
  async updateUser(@Query('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  deleteUser(@Request() req): string {
    return 'Delete user';
  }

}
