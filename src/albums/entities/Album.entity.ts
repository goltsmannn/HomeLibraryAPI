import {v4 as uuidv4} from 'uuid';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  public static generateId(): string {
    return uuidv4();
  }
}