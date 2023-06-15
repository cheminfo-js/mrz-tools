'use strict';

import parseDocumentCode from '../parsers/parseDocumentCodePassport';
import { parsePersonalNumber } from '../parsers/parsePersonalNumber';
import { parsePersonalNumberCheckDigit } from '../parsers/parsePersonalNumberCheckDigit';
import { FieldOptions } from '../types';

import { createFieldParser } from './createFieldParser';
import {
  birthDateCheckDigitTemplate,
  birthDateTemplate,
  compositeCheckDigitTemplate,
  documentCodeTemplate,
  documentNumberCheckDigitTemplate,
  documentNumberTemplate,
  expirationDateCheckDigitTemplate,
  expirationDateTemplate,
  firstNameTemplate,
  issuingStateTemplate,
  lastNameTemplate,
  nationalityTemplate,
  sexTemplate,
} from './fieldTemplates';

const td3Fields: FieldOptions[] = [
  {
    ...documentCodeTemplate,
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode,
  },
  { ...issuingStateTemplate, line: 0, start: 2, end: 5 },
  { ...lastNameTemplate, line: 0, start: 5, end: 44 },
  { ...firstNameTemplate, line: 0, start: 5, end: 44 },
  { ...documentNumberTemplate, line: 1, start: 0, end: 9 },
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
    label: 'Personal number',
    field: 'personalNumber',
    line: 1,
    start: 28,
    end: 42,
    parser: parsePersonalNumber,
  },
  {
    label: 'Personal number check digit',
    field: 'personalNumberCheckDigit',
    line: 1,
    start: 42,
    end: 43,
    related: [
      {
        line: 1,
        start: 28,
        end: 42,
      },
    ],
    parser: parsePersonalNumberCheckDigit,
  },
  {
    ...compositeCheckDigitTemplate,
    line: 1,
    start: 43,
    end: 44,
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
        end: 43,
      },
    ],
  },
];

export default td3Fields.map(createFieldParser);
