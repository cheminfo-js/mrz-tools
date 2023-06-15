'use strict';

import { Autocorrect, FieldOptions } from '../types';

const numberToLetterMismatches = {
  '8': 'B',
  '6': 'G',
  '0': 'O',
  '1': 'I',
  '5': 'S',
  '2': 'Z',
};
const letterToNumberMismatches = {
  B: '8',
  G: '6',
  O: '0',
  I: '1',
  S: '5',
  Z: '2',
};

/**
 * It takes a string and returns a string
 * @param {string} char - The character to convert.
 * @returns A function that takes a string and returns a string.
 */
export function letterToNumber(char: string): string {
  if (letterToNumberMismatches[char]) {
    return letterToNumberMismatches[char];
  }
  return char;
}

/**
 * It takes a string and returns a string
 * @param {string} char - The character to convert.
 * @returns A function that takes a string and returns a string.
 */
export function numberToLetter(char: string): string {
  if (numberToLetterMismatches[char]) {
    return numberToLetterMismatches[char];
  }
  return char;
}

/**
 * It takes a string and a fieldOptions object, and returns an object with a correctedLine string and
 * an autocorrect array
 * @param {string} source - The string to be corrected
 * @param fieldOptions - Pick<FieldOptions, 'line' | 'type' | 'start'>
 * @returns An object with two properties: correctedLine and autocorrect.
 */
export function autoCorrection(
  source: string,
  fieldOptions: Pick<FieldOptions, 'line' | 'type' | 'start'>,
) {
  let correctedLine = '';
  const autocorrect: Autocorrect[] = [];
  const chars = source.split('');
  chars.forEach((char, i) => {
    if (fieldOptions.type === 'ALPHABETIC') {
      const correctedChar = numberToLetter(char);
      if (correctedChar !== char) {
        autocorrect.push({
          line: fieldOptions.line,
          column: fieldOptions.start + i,
          original: char,
          corrected: correctedChar,
        });
      }
      correctedLine += correctedChar;
    } else if (fieldOptions.type === 'NUMERIC') {
      const correctedChar = letterToNumber(char);
      if (correctedChar !== char) {
        autocorrect.push({
          line: fieldOptions.line,
          column: fieldOptions.start + i,
          original: char,
          corrected: correctedChar,
        });
      }
      correctedLine += correctedChar;
    } else {
      correctedLine += char;
    }
  });
  return { correctedLine, autocorrect };
}
