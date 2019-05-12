import { Trie } from './trie';

export interface Splitter {
  (key: string): string[];
}

export const splitter: Splitter = (key: string) => {
  const result = key.split('/');
  if (key.startsWith('/')) result.shift();
  return result;
};

export interface Hash<V> {
  (value: V): string;
}

export class PrefixMap<V> {
  // Protected so that it does not get
  // mangled by an aggressive minifier.
  protected map: { [key: string]: V } = {};
  protected trie = new Trie<string[]>(splitter);

  constructor(private hash: Hash<V>) {}

  insert(str: string, value: V) {
    this.map[this.hash(value)] = value;
    this.trie.insert(str, [this.hash(value)]);
  }

  find(query: string): V[] {
    const res = this.trie.find(query);
    if (!res) return [];
    return Array.prototype.concat.apply([], res.map(r => r.map(k => this.map[k])));
  }
}
