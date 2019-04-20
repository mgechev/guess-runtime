import { Model, Prediction } from './model';

export class Markov implements Model {
  predict(path: string | string[]): Prediction[] {
    return [];
  }
}
