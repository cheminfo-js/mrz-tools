'use strict';

/**
 * It takes a string and replaces all the < characters with spaces, and then removes any trailing <
 * characters
 * @param {string} string - The string to be cleaned.
 * @returns A string with all the < characters removed.
 */
export function cleanText(string: string) {
  return string.replace(/<+$/g, '').replace(/</g, ' ');
}
