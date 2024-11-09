import {Material} from "./material";

interface Item {
  name: string,
  materials: Material[],
  reuse: string[],
  recycle: string[],
  valuable: boolean,
}

export type { Item };
