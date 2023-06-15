'use strict';

/**
 * It takes a string, checks that it's a valid date, and returns the string
 * @param {string} value - The value to parse.
 * @returns A string
 */
export default function parseDate(value: string) {
  if (!value.match(/^[0-9<]{4,6}$/)) {
    throw new Error(`invalid date: ${value}`);
  }

  const month = value.substring(2, 4);
  if (month !== '<<' && (parseInt(month, 10) < 1 || parseInt(month, 10) > 12)) {
    throw new Error(`invalid date month: ${month}`);
  }

  if (value.length === 6) {
    const day = value.substring(4, 6);
    if (day !== '<<' && (parseInt(day, 10) < 1 || parseInt(day, 10) > 31)) {
      throw new Error(`invalid date day: ${day}`);
    }
  }

  return value;
}
