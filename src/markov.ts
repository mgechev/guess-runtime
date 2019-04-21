import { Model, Prediction } from './model';
import { Hash } from './prefix-map';

let c = 0;
let map: { [key: string]: string } = {};
export const hash: Hash<Prediction> = (value: Prediction) => {
  if (map[value.path]) return map[value.path];
  const key = (c++).toString();
  map[value.path] = key;
  return key;
};

export class Markov implements Model {
  predict(path: string | string[]): Prediction[] {
    return [];
  }
}
