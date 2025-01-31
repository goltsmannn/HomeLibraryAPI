import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  artistId: string; // refers to Artist

}