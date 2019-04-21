import { Markov, hash } from './markov';
import { PrefixMap } from './prefix-map';
import { Prediction } from './model';

describe('Markov model', () => {
  it('should return an empty array on empty input', () => {
    const m = new Markov(new PrefixMap<Prediction>(hash));
    expect(() => m.predict([])).toThrow();
  });
});
