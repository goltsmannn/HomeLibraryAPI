import { Model } from '../../database/Model';

export class Album extends Model{
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

}