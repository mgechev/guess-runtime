import { Trie } from './trie';
import { splitter } from './prefix-map';

describe('Trie', () => {
  it('should accept keys and values', () => {
    const trie = new Trie<string>(splitter);
    trie.insert('foo/bar', 'foo');
    expect(trie.find('foo/bar')).toEqual(['foo']);
  });

  it('should accept keys with "/" prefix and values', () => {
    const trie = new Trie<string>(splitter);
    trie.insert('/foo/bar', '42');
    expect(trie.find('/foo/bar')).toEqual(['42']);
    expect(trie.find('foo/bar')).toEqual(['42']);
  });

  it('should work with common sub paths', () => {
    const trie = new Trie<string>(splitter);
    trie.insert('/foo/bar/baz', '42');
    trie.insert('/foo/bar/qux', '1.618');
    expect(trie.find('/foo/bar/baz')).toEqual(['42']);
    expect(trie.find('foo/bar/qux')).toEqual(['1.618']);
  });

  it("should return undefined when it doesn't find a value", () => {
    const trie = new Trie<string>(splitter);
    trie.insert('/foo/bar/baz', '42');
    expect(trie.find('foo/bar/qux')).toEqual([]);
  });

  it('should understand wildcards', () => {
    const trie = new Trie<string>(splitter);
    trie.insert('/foo/bar/baz', '41');
    trie.insert('/foo/qux/baz', '42');
    trie.insert('/foo/baz/baz', '43');
    expect(trie.find('foo/*/baz')).toEqual(['41', '42', '43']);
  });

  it('should understand multiple wildcards', () => {
    const trie = new Trie<string>(splitter);
    trie.insert('/foo/bar/baz', '41');
    trie.insert('/foo/qux/baz', '42');
    trie.insert('/foo/baz/qux', '43');
    expect(trie.find('foo/*/*')).toEqual(['41', '42', '43']);
  });

  it('should understand wildcards but return empty on no match', () => {
    const trie = new Trie<string>(splitter);
    trie.insert('/foo/bar/baz', '41');
    trie.insert('/foo/qux/baz', '42');
    trie.insert('/foo/baz/qux', '43');
    expect(trie.find('*/*/var')).toEqual([]);
  });
});
