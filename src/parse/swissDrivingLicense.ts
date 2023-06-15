'use strict';

import { formats } from '../formats';
import { ParseMRZOptions } from '../types';
import getResult from './getResult';
import swissDrivingLicenseFields from './swissDrivingLicenseFields';

const SWISS_DRIVING_LICENSE = formats.SWISS_DRIVING_LICENSE;
/**
 * It checks that the number of lines is 3, that the number of characters in each line is correct, and
 * then calls the `getResult` function
 * @param {string[]} lines - string[]
 * @param {ParseMRZOptions} options - ParseMRZOptions
 * @returns the result of the getResult function.
 */
export default function parseSwissDrivingLicense(
  lines: string[],
  options: ParseMRZOptions,
) {
  if (lines.length !== 3) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 3 for ${SWISS_DRIVING_LICENSE}`,
    );
  }
  if (lines[0].length !== 9) {
    throw new Error(
      `invalid number of characters for line 1: ${lines[0].length}. Must be 9 for ${SWISS_DRIVING_LICENSE}`,
    );
  }
  if (lines[1].length !== 30) {
    throw new Error(
      `invalid number of characters for line 2: ${lines[1].length}. Must be 30 for ${SWISS_DRIVING_LICENSE}`,
    );
  }

  if (lines[2].length !== 30) {
    throw new Error(
      `invalid number of characters for line 3: ${lines[2].length}. Must be 30 for ${SWISS_DRIVING_LICENSE}`,
    );
  }
  return getResult(
    SWISS_DRIVING_LICENSE,
    lines,
    swissDrivingLicenseFields,
    options,
  );
}
