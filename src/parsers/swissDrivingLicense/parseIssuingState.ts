'use strict';

/**
 * It takes a string, and if it's not 'CHE' or 'LIE', it throws an error
 * @param {string} source - the string to be parsed
 * @returns A string
 */
export default function parseIssuingState(source: string) {
  if (source !== 'CHE' && source !== 'LIE') {
    throw new Error(`invalid state code: ${source}. Must be CHE or LIE`);
  }
  return source;
}
