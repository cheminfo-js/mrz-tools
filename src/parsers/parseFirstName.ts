'use strict';

import { parseText } from './parseText';

/**
 * It takes a string, removes everything before the first `<<` and returns the first sequence of
 * capital letters that ends with `<`
 * @param {string} source - The string to parse.
 * @returns An object with the value, start, and end properties.
 */
export default function parseFirstName(source: string) {
  const withoutStart = source.replace(/.*?<{2}/, '');
  const value = parseText(withoutStart, /^[A-Z<]+<*$/);
  const start = source.length - withoutStart.length;
  return {
    value,
    start,
    end: start + value.length,
  };
}
