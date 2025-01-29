import { CreateTrackDto } from './CreateTrackDto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto extends CreateTrackDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  duration: number;
}