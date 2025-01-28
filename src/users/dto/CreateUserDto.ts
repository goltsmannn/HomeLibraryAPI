import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
