import { Splitter } from './prefix-map';

const trieValue: unique symbol = Symbol('value');

export interface TrieStore<V> {
  [key: string]: TrieStore<V>;
  [trieValue]?: V[];
}

export class Trie<V> {
  private store: TrieStore<V> = {};

  constructor(private splitter: Splitter) {}

  insert(key: string, value: V) {
    const parts = this.splitter(key);
    let current = this.store;
    while (parts.length) {
      const part = parts.shift();
      current[part] = current[part] || {};
      current = current[part];
    }
    if (!current[trieValue]) current[trieValue] = [];
    current[trieValue].push(value);
  }

  find(query: string): V[] | undefined {
    const parts = this.splitter(query);
    let current = this.store;
    while (parts.length && current) {
      current = current[parts.shift()];
    }
    if (current) return current[trieValue];
    return [];
  }
}
