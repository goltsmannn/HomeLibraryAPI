import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateAlbumDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

}