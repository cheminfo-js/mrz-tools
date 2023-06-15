'use strict';

import { cleanText } from './cleanText';

/**
 * It takes a string and returns a string
 * @param {string} source - The text to parse.
 * @param regexp - The regular expression that the text must match.
 * @returns A function that takes two arguments, source and regexp.
 */
export function parseText(source: string, regexp = /^[0-9A-Z<]+$/) {
  if (!source.match(regexp)) {
    throw new Error(
      `invalid text: ${source}. Must match the following regular expression: ${regexp.toString()}`,
    );
  }
  return cleanText(source);
}
