import { PrefixMap, splitter, SeqHash } from './prefix-map';
import { Prediction } from './model';
import { hash } from './markov';

describe('splitter', () => {
  it('should work with empty strings', () => {
    expect(splitter('')).toEqual(['']);
  });

  it('should split URLs', () => {
    expect(splitter('/a/b')).toEqual(['a', 'b']);
  });

  it('should split URLs with query params', () => {
    expect(splitter('/a/b?foo')).toEqual(['a', 'b?foo']);
  });
});

describe('PrefixMap', () => {
  it('should work with URLs', () => {
    const map = new PrefixMap<Prediction>(hash);
    map.insert('/foo/bar', { path: '/bar', chance: 0.3 });
    map.insert('/foo/bar', { path: '/baz', chance: 0.7 });
    const res = map.find('/foo/bar');
    expect(res.length).toBe(2);
    expect(res[0].path).toBe('/bar');
    expect(res[1].path).toBe('/baz');
  });
});
