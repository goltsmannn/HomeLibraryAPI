import {v4 as uuidv4} from 'uuid';
import { Model } from '../../database/Model';

export class Artist extends Model {
  name: string;
  grammy: boolean;
}