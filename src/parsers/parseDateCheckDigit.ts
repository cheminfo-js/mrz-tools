'use strict';

import { check } from './check';

/**
 * "Check the check digit and return it."
 *
 * The function is a pure function. It doesn't have any side effects. It doesn't mutate any data. It
 * doesn't read or write to the DOM. It doesn't read or write to a database. It doesn't read or write
 * to a file. It doesn't read or write to the network. It doesn't read or write to the console. It
 * doesn't read or write to the clipboard. It doesn't read or write to the screen. It doesn't read or
 * write to the keyboard. It doesn't read or write to the mouse. It doesn't read or write to the
 * speaker. It doesn't read or write to the microphone. It doesn't read or write to the camera. It
 * doesn't read or write to the GPS. It doesn't read or write to the accelerometer. It doesn't read or
 * write to the gyroscope. It doesn't read or write to the compass. It doesn't
 * @param {string} checkDigit - The check digit that was passed in.
 * @param {string} value - The value to be checked.
 * @returns The checkDigit is being returned.
 */
export default function parseCheckDigit(checkDigit: string, value: string) {
  check(value, checkDigit);
  return checkDigit;
}
