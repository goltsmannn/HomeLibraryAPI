import { v4 as uuidv4 } from 'uuid';

export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  static generateId(): string {
    return uuidv4();
  }
}