import { Splitter } from './prefix-map';

const trieValue: unique symbol = Symbol('value');

export interface TrieNode<V> {
  [key: string]: TrieNode<V>;
  [trieValue]?: V[];
}

const Wildcard = '*';

const find = <V>(query: string[], i: number, node: TrieNode<V> | undefined): V[] | undefined => {
  if (!node) return [];
  if (i >= query.length) return node[trieValue];
  const c = query[i++];
  if (c === Wildcard) {
    let result = [];
    for (let key in node) result = result.concat(find(query, i, node[key]));
    return result;
  }
  return find(query, i, node[c]);
};

export class Trie<V> {
  private node: TrieNode<V> = {};

  constructor(private splitter: Splitter) {}

  insert(key: string, value: V) {
    const parts = this.splitter(key);
    let current = this.node;
    while (parts.length) {
      const part = parts.shift();
      current[part] = current[part] || {};
      current = current[part];
    }
    if (!current[trieValue]) current[trieValue] = [];
    current[trieValue].push(value);
  }

  find(query: string): V[] {
    return find<V>(this.splitter(query), 0, this.node) || [];
  }
}
