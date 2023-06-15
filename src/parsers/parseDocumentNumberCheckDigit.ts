'use strict';

import { check } from './check';

/**
 * It checks the check digit of a document number
 * @param {string} checkDigit - The check digit that was found in the document number.
 * @param {string} source - the document number without the check digit
 * @param {string} optional - The optional part of the MRZ.
 * @returns an object with the value, start, and end properties.
 */
export default function parseDocumentNumberCheckDigit(
  checkDigit: string,
  source: string,
  optional: string,
) {
  if (checkDigit === '<' && optional) {
    const firstFiller = optional.indexOf('<');
    const tail = optional.substring(0, firstFiller - 1);
    source = `${source}<${tail}`;
    checkDigit = optional.charAt(firstFiller - 1);
    check(source, checkDigit);
    return {
      value: checkDigit,
      start: firstFiller,
      end: firstFiller + 1,
    };
  } else {
    check(source, checkDigit);
    return checkDigit;
  }
}
