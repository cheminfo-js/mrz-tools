'use strict';

import { check } from './check';
import { cleanText } from './cleanText';

/**
 * It takes a string and a string and returns a string
 * @param {string} checkDigit - the check digit from the personal number
 * @param {string} personalNumber - The personal number to check.
 * @returns The check digit is being returned.
 */
export function parsePersonalNumberCheckDigit(
  checkDigit: string,
  personalNumber: string,
) {
  const cleanNumber = cleanText(personalNumber);
  if (cleanNumber === '') {
    if (checkDigit !== '<' && checkDigit !== '0') {
      throw new Error(`invalid check digit ${checkDigit}: must be 0 or <`);
    } else {
      return checkDigit;
    }
  }
  check(personalNumber, checkDigit);
  return checkDigit;
}
