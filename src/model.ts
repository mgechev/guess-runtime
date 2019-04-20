export interface Prediction {
  chance: number;
  path: string;
}

export interface Model {
  predict(path: string | string[]): Prediction[];
}
