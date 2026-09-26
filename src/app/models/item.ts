import { Material } from './material';

export interface Item {
  name: string;
  materials: Material[];
  reuse: string[];
  recycle: string[];
  valuable: boolean;
}
