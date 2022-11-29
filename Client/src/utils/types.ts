import { value } from "./graph";

export interface minionType {
  id: number;
  xPos: number;
  yPos: number;
  rotation: number;
  path: number[];
  thoughtProcess: number[];
}

export interface MazeTileType {
  value: value, 
  classes: ('b' | 't' | 'l' | 'r')[], 
  path: '' | 'THOUGHTPROCESS' | 'PATH'
}
