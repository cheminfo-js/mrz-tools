'use strict';

import { formats } from '../formats';
import { ParseMRZOptions } from '../types';
import getResult from './getResult';
import TD1Fields from './td1Fields';

const TD1 = formats.TD1;
/**
 * It takes an array of three strings, each of which is 30 characters long, and returns an object with
 * the parsed data
 * @param {string[]} lines - An array of strings, each string representing a line of the MRZ.
 * @param {ParseMRZOptions} options - ParseMRZOptions
 * @returns the result of the getResult function.
 */
export default function parseTD1(lines: string[], options: ParseMRZOptions) {
  if (lines.length !== 3) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 3 for ${TD1}`,
    );
  }
  lines.forEach((line: string, index) => {
    if (line.length !== 30) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 30 for ${TD1}`,
      );
    }
  });
  return getResult(TD1, lines, TD1Fields, options);
}
