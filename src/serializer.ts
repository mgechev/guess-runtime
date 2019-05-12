import { PrefixMap } from './prefix-map';

export const serialize = <V>(pmap: PrefixMap<V>) => {
  return JSON.stringify(pmap);
};
