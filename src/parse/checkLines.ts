'use strict';

/**
 * It takes a string or an array of strings, and throws an error if the input is invalid
 * @param {string | string[]} lines - The lines of the program.
 * @returns A function that takes a string or array of strings and returns an array of strings.
 */
export function checkLines(lines: string | string[]) {
  if (typeof lines === 'string') {
    lines = lines.split(/[\r\n]+/);
  }
  if (!Array.isArray(lines)) {
    throw new TypeError('input must be an array or string');
  }
  for (const line of lines) {
    if (!line.match(/[A-Z0-9<]+/)) {
      throw new TypeError(
        'lines must be composed of only alphanumerical characters and "<"',
      );
    }
  }
  return lines;
}
