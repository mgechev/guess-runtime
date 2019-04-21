import { Model, Prediction } from './model';
import { Hash, PrefixMap } from './prefix-map';

let c = 0;
let map: { [key: string]: string } = {};
export const hash: Hash<Prediction> = (value: Prediction) => {
  if (map[value.path]) return map[value.path];
  const key = (c++).toString();
  map[value.path] = key;
  return key;
};

export class Markov implements Model {
  constructor(private map: PrefixMap<Prediction>) {}

  predict(path: string | string[]): Prediction[] {
    if (Array.isArray(path)) {
      throw new Error('The Markov model does not support path sequence');
    }
    return this.map.find(path);
  }
}
