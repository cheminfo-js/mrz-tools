'use strict';

/**
 * It takes a string and returns a string
 * @param {string} source - the string to parse
 * @returns The source string is being returned.
 */
export default function parseDocumentCode(source: string) {
  if (source !== 'FA') {
    throw new Error(`invalid document code: ${source}. Must be FA`);
  }
  return source;
}
