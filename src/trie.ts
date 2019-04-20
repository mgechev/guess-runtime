import { Splitter } from './prefix-map';

const trieValue: unique symbol = Symbol('value');

export interface TrieStore<V> {
  [key: string]: TrieStore<V>;
  [trieValue]?: V;
}

export class Trie<V> {
  private store: TrieStore<V>;

  constructor(private splitter: Splitter) {}

  insert(key: string, value: V) {
    const parts = this.splitter(key);
    while (parts.length) {
      const part = parts.shift();
      this.store[part] = this.store[part] || {};
      if (parts.length === 0) {
        this.store[part][trieValue] = value;
      }
    }
  }
}
