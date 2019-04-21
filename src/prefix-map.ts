import { Trie } from './trie';

export interface Splitter {
  (key: string): string[];
}

export const splitter: Splitter = (key: string) => {
  const result = key.split('/');
  if (key.startsWith('/')) result.shift();
  return result;
};

export class SeqHash {
  private static map: { [key: string]: string } = {};
  private static counter = 0;
  constructor(public url: string, public chance: number) {}

  hash() {
    if (SeqHash.map[this.url]) return SeqHash.map[this.url];
    const val = (SeqHash.counter++).toString();
    SeqHash.map[this.url] = val;
    return val;
  }
}

export interface Hash<V> {
  (value: V): string;
}

export class PrefixMap<V> {
  private map: { [key: string]: V } = {};
  private trie = new Trie<string[]>(splitter);

  constructor(private hash: Hash<V>) {}

  insert(str: string, value: V) {
    this.map[this.hash(value)] = value;
    const existing = this.trie.find(str);
    if (existing) existing.push(this.hash(value));
    else this.trie.insert(str, [this.hash(value)]);
  }

  find(str: string): V[] {
    const res = this.trie.find(str);
    if (!res) return [];
    return res.map(r => this.map[r]);
  }
}
