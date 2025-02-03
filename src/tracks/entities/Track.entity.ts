import { Model } from '../../database/Model';

export class Track extends Model{
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}