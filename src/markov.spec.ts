import { Markov } from './markov';

describe('Markov model', () => {
  it('should return an empty array on empty input', () => {
    const m = new Markov();
    expect(m.predict([])).toEqual([]);
  });
});
