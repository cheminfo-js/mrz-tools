'use strict';

import parseLanguageCode from './parseLanguageCode';

/**
 * It parses a string that starts with three alphanumeric digits, followed by three numeric digits,
 * followed by a language code, followed by <<
 * @param {string} source - The string to parse.
 * @returns An object with the value of the document number, the start and end positions of the
 * document number.
 */
export default function parseDocumentNumber(source: string) {
  // swiss driving license number
  const first = source.substring(0, 3);
  const second = source.substring(3, 6);
  const languageCode = source.charAt(6);
  const end = source.substring(7);

  if (!first.match(/^[A-Z0-9]{3}$/)) {
    throw new Error(
      `invalid document number: ${source}. Must start with three alphanumeric digits`,
    );
  }
  if (!second.match(/^[0-9]{3}$/)) {
    throw new Error(
      `invalid document number: ${source}. Must have numeric digits in positions 4, 5 and 6`,
    );
  }
  if (end !== '<<') {
    throw new Error(`invalid document number: ${source}. Must end with <<`);
  }

  // calling this method to throw if languageCode invalid
  parseLanguageCode(languageCode);
  return {
    value: source.substring(0, 7),
    start: 0,
    end: 7,
  };
}
