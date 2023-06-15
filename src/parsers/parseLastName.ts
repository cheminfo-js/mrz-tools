'use strict';

import { parseText } from './parseText';

/**
 * It takes a string, removes any text after the first double angle bracket, and returns the result
 * @param {string} source - The string to parse.
 * @returns An object with the value, start, and end properties.
 */
export default function parseLastName(source: string) {
  const parsed = parseText(source.replace(/<{2}.*/, ''), /^[A-Z<]*<*$/);
  return {
    value: parsed,
    start: 0,
    end: parsed.length,
  };
}
