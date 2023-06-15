'use strict';

import { parseAlpha } from '../parsers/parseAlpha';
import parseDocumentCode from '../parsers/parseDocumentCodeId';
import { parseOptional } from '../parsers/parseOptional';
import { FieldOptions } from '../types';

import { createFieldParser } from './createFieldParser';
import {
  birthDateCheckDigitTemplate,
  birthDateTemplate,
  compositeCheckDigitTemplate,
  documentCodeTemplate,
  documentNumberCheckDigitTemplate,
  documentNumberTemplate,
  firstNameTemplate,
  issueDateTemplate,
  issuingStateTemplate,
  lastNameTemplate,
  sexTemplate,
} from './fieldTemplates';

const frenchNationalRecord: FieldOptions[] = [
  {
    ...documentCodeTemplate,
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode,
  },
  { ...issuingStateTemplate, line: 0, start: 2, end: 5 },
  { ...lastNameTemplate, line: 0, start: 5, end: 30, parser: parseAlpha },
  {
    label: 'Administrative code',
    field: 'administrativeCode',
    line: 0,
    start: 30,
    end: 36,
    parser: parseOptional,
  },
  { ...issueDateTemplate, line: 1, start: 0, end: 4 },
  {
    label: 'Administrative code 2',
    field: 'administrativeCode2',
    line: 1,
    start: 4,
    end: 7,
    parser: parseOptional,
  },
  { ...documentNumberTemplate, line: 1, start: 7, end: 12 },
  {
    ...documentNumberCheckDigitTemplate,
    line: 1,
    start: 12,
    end: 13,
    related: [
      {
        line: 1,
        start: 0,
        end: 12,
      },
    ],
  },
  { ...firstNameTemplate, line: 1, start: 13, end: 27, parser: parseAlpha },
  { ...birthDateTemplate, line: 1, start: 27, end: 33 },
  {
    ...birthDateCheckDigitTemplate,
    line: 1,
    start: 33,
    end: 34,
    related: [
      {
        line: 1,
        start: 27,
        end: 33,
      },
    ],
  },
  { ...sexTemplate, line: 1, start: 34, end: 35 },
  {
    ...compositeCheckDigitTemplate,
    line: 1,
    start: 35,
    end: 36,
    related: [
      {
        line: 0,
        start: 0,
        end: 36,
      },
      {
        line: 1,
        start: 0,
        end: 35,
      },
    ],
  },
];

export default frenchNationalRecord.map(createFieldParser);
