'use strict';

import { check } from './check';

/**
 * "Given a check digit and a list of sources, return the check digit."
 *
 * The function is written in TypeScript, which is a superset of JavaScript. The function is written in
 * a functional style, which means that it is a pure function. A pure function is a function that has
 * no side effects. A pure function always returns the same result given the same arguments
 * @param {string} checkDigit - The check digit to validate.
 * @param {string[]} sources - The source strings to be checked.
 * @returns The checkDigit is being returned.
 */
export default function parseCompositeCheckDigit(
  checkDigit: string,
  ...sources: string[]
) {
  const source = sources.join('');
  check(source, checkDigit);
  return checkDigit;
}
