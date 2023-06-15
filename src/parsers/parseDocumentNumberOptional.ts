'use strict';

import { parseText } from './parseText';

/**
 * It parses the optional part of a document number
 * @param {string} optional - The optional part of the document number.
 * @param {string} checkDigit - The check digit for the document number.
 * @returns An object with the value, start, and end properties.
 */
export function parseDocumentNumberOptional(
  optional: string,
  checkDigit: string,
) {
  if (checkDigit === '<') {
    const firstFiller = optional.indexOf('<');
    const value = parseText(optional.substring(firstFiller + 1));
    return {
      value,
      start: firstFiller + 1,
      end: firstFiller + 1 + value.length,
    };
  } else {
    const value = parseText(optional);
    return {
      value,
      start: 0,
      end: value.length,
    };
  }
}
