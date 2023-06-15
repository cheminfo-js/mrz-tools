'use strict';

import {
  Autocorrect,
  CreateFieldParserResult,
  Details,
  Formats,
  ParseMRZOptions,
  Record,
  Results,
} from '../types';

/**
 * It takes an array of lines, an array of field parsers, and an array of autocorrects, and returns an
 * array of details
 * @param {string[]} lines - string[] - the lines of the file
 * @param {CreateFieldParserResult[]} fieldParsers - An array of objects that contain a parser function
 * and a field name.
 * @param {Autocorrect[][]} autocorrectArray - An array of arrays of autocorrects. Each array of
 * autocorrects corresponds to a field parser.
 * @returns An array of details.
 */
function getDetails(
  lines: string[],
  fieldParsers: CreateFieldParserResult[],
  autocorrectArray: Autocorrect[][],
) {
  const details: Details[] = [];
  fieldParsers.forEach(({ parser }, i) => {
    details.push(parser(lines, autocorrectArray[i]));
  });
  return details;
}

/**
 * It takes an array of objects with a field, value, and valid property, and returns an object with a
 * fields property and a valid property
 * @param {Details[]} details - Details[]
 * @returns A record with fields and a valid boolean.
 */
function getFields(details: Details[]): Record {
  const record: Record = { fields: {}, valid: true };
  let valid = true;
  for (const detail of details) {
    if (!detail.valid) valid = false;
    if (detail.field) {
      record.fields[detail.field] = detail.value;
    }
  }
  return { fields: record.fields, valid };
}

/**
 * It takes in a list of lines, a list of field parsers, and a boolean indicating whether or not to
 * autocorrect. It then runs each field parser on the lines, and if autocorrect is true, it runs the
 * autocorrector on the lines. It returns the corrected lines and an array of autocorrects
 * @param {string[]} lines - string[] - the lines of the file
 * @param {CreateFieldParserResult[]} fieldParsers - An array of objects that contain the field parser
 * and autocorrector functions.
 * @param {boolean} autocorrect - boolean
 * @returns An object with two properties: corrected and autocorrectArray.
 */
function getCorrection(
  lines: string[],
  fieldParsers: CreateFieldParserResult[],
  autocorrect: boolean,
) {
  let corrected = lines;
  const autocorrectArray: Autocorrect[][] = [];

  if (autocorrect) {
    fieldParsers.forEach(({ autocorrector }) => {
      const result = autocorrector(corrected);
      autocorrectArray.push(result.autocorrect);
      corrected = result.correctedLines;
    });
  }
  return { corrected, autocorrectArray };
}

/**
 * It takes the lines of the MRZ, the field parsers, and the options, and returns the result
 * @param {Formats} format - The format of the MRZ.
 * @param {string[]} lines - The lines of the MRZ
 * @param {CreateFieldParserResult[]} fieldParsers - An array of objects that contain the field name,
 * the field value, and the field's validation function.
 * @param {ParseMRZOptions} options - ParseMRZOptions
 * @returns The result of the parsing of the MRZ.
 */
export default function getResult(
  format: Formats,
  lines: string[],
  fieldParsers: CreateFieldParserResult[],
  options: ParseMRZOptions,
): Results {
  const { autocorrect = false } = options;

  const { corrected, autocorrectArray } = getCorrection(
    lines,
    fieldParsers,
    autocorrect,
  );
  const details = getDetails(corrected, fieldParsers, autocorrectArray);
  const fields = getFields(details);
  const result = {
    format,
    details,
    fields: fields.fields,
    valid: fields.valid,
  };
  return result;
}
