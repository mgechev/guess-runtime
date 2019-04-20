import { Trie } from './trie';

export interface Hashable {
  hash(): string;
}

export interface Splitter {
  (key: string): string[];
}

export const splitter: Splitter = (key: string) => {
  const result = [];
  let part = '';
  let skip = false;
  key.split('').forEach((v, i) => {
    if (v === ':') {
      if (skip) {
        part += ':';
        skip = false;
        return;
      }
      result.push(part);
      part = '';
      return;
    }
    if (v === '\\') {
      skip = true;
      return;
    }
    part += v;
  });
  return result;
};

export class PrefixMap<V extends Hashable> {
  private map: { [key: string]: V } = {};
  private trie = new Trie<string>(splitter);

  insert(str: string, value: V) {
    this.map[value.hash()] = value;
  }
}
