'use strict';

import { parseText } from './parseText';

/**
 * It takes a string and returns a string
 * @param {string} source - The string to parse.
 * @returns An object with a value, start, and end property.
 */
export function parseOptional(source: string) {
  const value = parseText(source);

  return {
    value,
    start: 0,
    end: 0 + value.length,
  };
}
