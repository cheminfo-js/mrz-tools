'use strict';

import STATES from '../generated/states';

import { cleanText } from './cleanText';

/**
 * It takes a string, cleans it up, and returns a state object
 * @param {string} source - The string to parse.
 * @returns An object with the value, start, and end properties.
 */
export default function parseState(source: string) {
  source = cleanText(source);
  let state = STATES[source];
  if (!state) {
    throw new Error(`invalid state code: ${source}`);
  }
  return {
    value: source,
    start: 0,
    end: source.length,
  };
}
