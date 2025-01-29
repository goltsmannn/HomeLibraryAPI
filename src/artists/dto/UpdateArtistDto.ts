import { IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  grammy?: boolean;
}