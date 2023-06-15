'use strict';

import { cleanText } from './cleanText';

/**
 * It takes a string, and if it's not all uppercase letters and <, it throws an error. Otherwise, it
 * returns the string with all non-alphabetical characters removed
 * @param {string} source - The string to be parsed.
 * @returns A function that takes a string and returns a string.
 */
export function parseAlpha(source: string) {
  if (!source.match(/^[A-Z<]+$/)) {
    throw new Error(
      `invalid text: ${source}. Must be only alphabetical with <`,
    );
  }
  return cleanText(source);
}
