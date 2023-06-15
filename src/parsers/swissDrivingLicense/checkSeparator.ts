'use strict';

/**
 * It checks that the input is composed only of "<" and throws an error if it isn't
 * @param {string} source - the string to be checked
 * @returns A function that takes a string and returns a string.
 */
export function checkSeparator(source: string) {
  if (!source.match(/^<*$/)) {
    throw new Error(
      `invalid separator: ${source}. Must be composed only of "<"`,
    );
  }
  return source;
}
