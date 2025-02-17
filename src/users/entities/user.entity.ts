import {v4 as uuidv4} from 'uuid';
import { Exclude } from 'class-transformer';

export class User {

  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  @Exclude()
  password: string;

  public static generateId(){
      return uuidv4();
  };
}

