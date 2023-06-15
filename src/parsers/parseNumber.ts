'use strict';

/**
 * It takes a string, checks if it's a valid number, and returns the string if it is
 * @param {string} source - The string to parse.
 * @returns A function that takes a string and returns a string.
 */
export function parseNumber(source: string) {
  if (!source.match(/^[0-9]+$/)) {
    throw new Error(`invalid number: ${source}`);
  }

  return source;
}
