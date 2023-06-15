'use strict';

import { formats } from '../formats';
import { ParseMRZOptions } from '../types';
import getResult from './getResult';

import TD3Fields from './td3Fields';

const TD3 = formats.TD3;
/**
 * It takes an array of two strings, each of which is 44 characters long, and returns an object with
 * the parsed data
 * @param {string[]} lines - An array of strings, each string representing a line of the MRZ.
 * @param {ParseMRZOptions} options - ParseMRZOptions
 * @returns the result of the getResult function.
 */
export default function parseTD3(lines: string[], options: ParseMRZOptions) {
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${TD3}`,
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 44) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 44 for TD3`,
      );
    }
  });
  return getResult(TD3, lines, TD3Fields, options);
}
