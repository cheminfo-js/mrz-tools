'use strict';

import parseDocumentCode from '../parsers/parseDocumentCodeId';
import { parseOptional } from '../parsers/parseOptional';
import { FieldOptions } from '../types';

import { createFieldParser } from './createFieldParser';
import {
  documentCodeTemplate,
  issuingStateTemplate,
  firstNameTemplate,
  lastNameTemplate,
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  nationalityTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  sexTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  compositeCheckDigitTemplate,
} from './fieldTemplates';

const td2Fields: FieldOptions[] = [
  {
    ...documentCodeTemplate,
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode,
  },
  { ...issuingStateTemplate, line: 0, start: 2, end: 5 },
  { ...lastNameTemplate, line: 0, start: 5, end: 36 },
  { ...firstNameTemplate, line: 0, start: 5, end: 36 },
  {
    ...documentNumberTemplate,
    line: 1,
    start: 0,
    end: 9,
    related: [
      {
        line: 1,
        start: 9,
        end: 10,
      },
      {
        line: 1,
        start: 28,
        end: 35,
      },
    ],
  },
  {
    ...documentNumberCheckDigitTemplate,
    line: 1,
    start: 9,
    end: 10,
    related: [
      {
        line: 1,
        start: 0,
        end: 9,
      },
      {
        line: 1,
        start: 28,
        end: 35,
      },
    ],
  },
  { ...nationalityTemplate, line: 1, start: 10, end: 13 },
  { ...birthDateTemplate, line: 1, start: 13, end: 19 },
  {
    ...birthDateCheckDigitTemplate,
    line: 1,
    start: 19,
    end: 20,
    related: [
      {
        line: 1,
        start: 13,
        end: 19,
      },
    ],
  },
  { ...sexTemplate, line: 1, start: 20, end: 21 },
  { ...expirationDateTemplate, line: 1, start: 21, end: 27 },
  {
    ...expirationDateCheckDigitTemplate,
    line: 1,
    start: 27,
    end: 28,
    related: [
      {
        line: 1,
        start: 21,
        end: 27,
      },
    ],
  },
  {
    label: 'Optional field',
    field: 'optional',
    line: 1,
    start: 28,
    end: 35,
    parser: parseOptional,
  },
  {
    ...compositeCheckDigitTemplate,
    line: 1,
    start: 35,
    end: 36,
    related: [
      {
        line: 1,
        start: 0,
        end: 10,
      },
      {
        line: 1,
        start: 13,
        end: 20,
      },
      {
        line: 1,
        start: 21,
        end: 35,
      },
    ],
  },
];

export default td2Fields.map(createFieldParser);
