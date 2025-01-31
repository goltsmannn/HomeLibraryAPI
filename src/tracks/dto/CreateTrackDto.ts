import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTrackDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  artistId: string | null;

  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;

}