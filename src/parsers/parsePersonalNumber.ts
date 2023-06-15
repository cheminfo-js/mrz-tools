'use strict';

import { parseText } from './parseText';

/**
 * It takes a string and returns a string
 * @param {string} source - The string to parse.
 * @returns An object with the value, start and end properties.
 */
export function parsePersonalNumber(source: string) {
  const value = parseText(source, /^[A-Z0-9<]+<*$/);
  return {
    value,
    start: 0,
    end: value.length,
  };
}
