import { Splitter } from './prefix-map';

const trieValue: unique symbol = Symbol.for('value');

interface TrieNode<V> {
  [key: string]: TrieNode<V>;
  [trieValue]?: V[];
}

const find = <V>(
  query: string[],
  i: number,
  node: TrieNode<V> | undefined,
  isWildcard: (p: string) => boolean
): V[] | undefined => {
  if (!node) return [];
  if (i >= query.length) return node[trieValue];
  const c = query[i++];
  if (isWildcard(c)) {
    let result = [];
    for (let key in node) result = result.concat(find(query, i, node[key], isWildcard));
    return result;
  }
  return find(query, i, node[c], isWildcard);
};

/**
 * Trie data structure
 */
export class Trie<V> {
  // Protected so that it does not get
  // mangled by an aggressive minifier.
  protected node: TrieNode<V> = {};

  /**
   * Creates new Trie instance.
   * @param splitter function to split the queries and keys
   * @param isWildcard checks if given part of the query is a wildcard value
   */
  constructor(private splitter: Splitter, private isWildcard = (p: string) => p.startsWith(':')) {}

  /**
   * Inserts a value in the Trie
   * @param key key to insert
   * @param value associated value
   */
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

  /**
   * Queries the Trie
   * @param query string query which may include a wildcard
   */
  find(query: string): V[] {
    return find<V>(this.splitter(query), 0, this.node, this.isWildcard) || [];
  }
}
