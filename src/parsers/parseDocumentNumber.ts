'use strict';

import { cleanText } from './cleanText';

/**
 * It takes a string, and returns an object with a value, start, and end property
 * @param {string} source - The text that was scanned.
 * @param {string} checkDigit - The check digit is the last digit of the document number. It is used to
 * verify the validity of the document number.
 * @param {string} optional - The optional part of the document number.
 * @returns An object with the value, start, and end properties.
 */
export default function parseDocumentNumber(
  source: string,
  checkDigit: string,
  optional: string,
) {
  let end: number, value: string;
  if (checkDigit === '<' && optional) {
    const firstFiller = optional.indexOf('<');
    const tail = optional.substring(0, firstFiller - 1);
    value = source + tail;
    end = value.length + 1;
  } else {
    value = cleanText(source);
    end = value.length;
  }
  return {
    value,
    start: 0,
    end,
  };
}
