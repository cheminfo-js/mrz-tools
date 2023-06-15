'use strict';

/**
 * It takes a string and returns a string
 * @param {string} languageCode - The language code of the language you want to translate to.
 * @returns A string
 */
export default function parseLanguageCode(languageCode: string) {
  switch (languageCode) {
    case 'D':
    case 'F':
    case 'I':
    case 'R':
      return languageCode;
    default:
      throw new Error(
        `invalid languageCode code: ${languageCode}. Must be D, F, I or R`,
      );
  }
}
