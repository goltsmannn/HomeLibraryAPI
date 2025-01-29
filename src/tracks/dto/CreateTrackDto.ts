import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTrackDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  duration: number;

}