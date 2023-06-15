'use strict';

import {
  Autocorrect,
  CreateFieldParserResult,
  Details,
  FieldOptions,
  Range,
} from '../types';
import { autoCorrection } from './autoCorrection';

/**
 * It takes a fieldOptions object and returns a parser function and an autocorrector function
 * @param {FieldOptions} fieldOptions - This is an object that contains the following properties:
 * @returns A function that takes in a string and returns a string.
 */
export function createFieldParser(
  fieldOptions: FieldOptions,
): CreateFieldParserResult {
  checkType(fieldOptions, 'label', 'string');
  if (fieldOptions.field !== null) {
    checkType(fieldOptions, 'field', 'string');
  }
  checkType(fieldOptions, 'line', 'number');
  checkType(fieldOptions, 'start', 'number');
  checkType(fieldOptions, 'end', 'number');
  checkType(fieldOptions, 'parser', 'function');

  const ranges: Range[] = [
    {
      line: fieldOptions.line,
      start: fieldOptions.start,
      end: fieldOptions.end,
    },
  ];
  if (Array.isArray(fieldOptions.related)) {
    for (const related of fieldOptions.related) {
      checkType(related, 'line', 'number');
      checkType(related, 'start', 'number');
      checkType(related, 'end', 'number');
      ranges.push(related);
    }
  }
  const parser = (lines: string[], autocorrect: Autocorrect[] = []) => {
    const source = getText(lines, fieldOptions);
    const related = fieldOptions.related || [];
    const textRelated = related.map((r) => getText(lines, r));
    const result: Details = {
      label: fieldOptions.label,
      field: fieldOptions.field,
      value: null,
      valid: false,
      ranges: ranges.map((range) => ({
        line: range.line,
        start: range.start,
        end: range.end,
        raw: getText(lines, range),
      })),
      line: 0,
      start: 0,
      end: 0,
      autocorrect,
    };
    const range = result.ranges[0];
    result.line = range.line;
    result.start = range.start;
    result.end = range.end;
    try {
      if (fieldOptions.parser !== undefined) {
        const parsed = fieldOptions.parser(source, ...textRelated);
        result.value = typeof parsed === 'object' ? parsed.value : parsed;
        result.valid = true;
        if (typeof parsed === 'object') {
          result.start = range.start + parsed.start;
          result.end = range.start + parsed.end;
        }
      }
    } catch (e: any) {
      result.error = e.message;
    }
    return result;
  };
  const autocorrector = (lines: string[]) => {
    let corrected = lines;
    let source = getText(lines, fieldOptions);
    let autocorrect: Autocorrect[] = [];
    const type = fieldOptions.type || 'ALPHANUMERIC';
    if (type !== 'ALPHANUMERIC') {
      const result = autoCorrection(source, fieldOptions);
      source = result.correctedLine;
      autocorrect = result.autocorrect;
    }
    corrected = changeText(lines, fieldOptions, source);
    return { correctedLines: corrected, autocorrect };
  };
  return { parser, autocorrector };
}

/**
 * `getText` takes a string or an array of strings and an object with `line`, `end`, and `start`
 * properties and returns a string
 * @param {string | string[]} lines - string | string[]
 * @param options - Pick<FieldOptions, 'line' | 'end' | 'start'>
 * @returns The text between the start and end of the line.
 */
function getText(
  lines: string | string[],
  options: Pick<FieldOptions, 'line' | 'end' | 'start'>,
) {
  const line = lines[options.line];
  return line.substring(options.start, options.end);
}

/**
 * It takes a line of text, and replaces a portion of it with some new text
 * @param {string[]} lines - The lines of the file.
 * @param options - This is the object that contains the line, start, and end properties.
 * @param {string} text - The text to be inserted
 * @returns The lines array with the new text inserted.
 */
function changeText(
  lines: string[],
  options: Pick<FieldOptions, 'line' | 'end' | 'start'>,
  text: string,
) {
  const line = lines[options.line];
  const newText =
    line.substring(0, options.start) + text + line.substring(options.end);
  lines[options.line] = newText;
  return lines;
}

/**
 * If the type of the property named name on the object options is not the type type, throw a
 * TypeError.
 * @param {object} options - object - The object to check.
 * @param {string} name - The name of the option to check.
 * @param {'string' | 'number' | 'function'} type - 'string' | 'number' | 'function'
 */
function checkType(
  options: object,
  name: string,
  type: 'string' | 'number' | 'function',
) {
  if (typeof options[name] !== type) {
    throw new TypeError(`${name} must be a ${type}`);
  }
}
