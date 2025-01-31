import {v4 as uuidv4} from 'uuid';

export class Model {
  id: string;

  static generateId(): string {
    return uuidv4();
  }
}