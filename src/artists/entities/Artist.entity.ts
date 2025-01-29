import {v4 as uuidv4} from 'uuid';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  static generateId() {
    return uuidv4();
  }
}