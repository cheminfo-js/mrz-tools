'use strict';

/**
 * It takes a string and returns a string
 * @param {string} source - The string to parse.
 * @returns A string.
 */
export default function parseSex(source: string) {
  switch (source) {
    case 'M':
      return 'male';
    case 'F':
      return 'female';
    case '<':
      return 'nonspecified';
    default:
      throw new Error(`invalid sex: ${source}. Must be M, F or <.`);
  }
}
