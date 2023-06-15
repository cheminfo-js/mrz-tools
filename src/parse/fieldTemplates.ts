'use strict';

import parseCompositeCheckDigit from '../parsers/parseCompositeCheckDigit';
import parseDate from '../parsers/parseDate';
import parseDateCheckDigit from '../parsers/parseDateCheckDigit';
import parseDocumentNumber from '../parsers/parseDocumentNumber';
import parseDocumentNumberCheckDigit from '../parsers/parseDocumentNumberCheckDigit';
import parseFirstName from '../parsers/parseFirstName';
import parseLastName from '../parsers/parseLastName';
import parseSex from '../parsers/parseSex';
import parseState from '../parsers/parseState';
import { TemplateDetails } from '../types';

const documentNumberTemplate: TemplateDetails = {
  label: 'Document number',
  field: 'documentNumber',
  parser: parseDocumentNumber,
  type: 'ALPHANUMERIC',
};

const documentNumberCheckDigitTemplate: TemplateDetails = {
  label: 'Document number check digit',
  field: 'documentNumberCheckDigit',
  parser: parseDocumentNumberCheckDigit,
  type: 'NUMERIC',
};

const documentCodeTemplate: TemplateDetails = {
  label: 'Document code',
  field: 'documentCode',
  type: 'ALPHABETIC',
};

const nationalityTemplate: TemplateDetails = {
  label: 'Nationality',
  field: 'nationality',
  parser: parseState,
  type: 'ALPHABETIC',
};

const sexTemplate: TemplateDetails = {
  label: 'Sex',
  field: 'sex',
  parser: parseSex,
  type: 'ALPHABETIC',
};

const expirationDateTemplate: TemplateDetails = {
  label: 'Expiration date',
  field: 'expirationDate',
  parser: parseDate,
  type: 'NUMERIC',
};

const expirationDateCheckDigitTemplate: TemplateDetails = {
  label: 'Expiration date check digit',
  field: 'expirationDateCheckDigit',
  parser: parseDateCheckDigit,
  type: 'NUMERIC',
};

const compositeCheckDigitTemplate: TemplateDetails = {
  label: 'Composite check digit',
  field: 'compositeCheckDigit',
  parser: parseCompositeCheckDigit,
  type: 'NUMERIC',
};

const birthDateTemplate: TemplateDetails = {
  label: 'Birth date',
  field: 'birthDate',
  parser: parseDate,
  type: 'NUMERIC',
};

const birthDateCheckDigitTemplate: TemplateDetails = {
  label: 'Birth date check digit',
  field: 'birthDateCheckDigit',
  parser: parseDateCheckDigit,
  type: 'NUMERIC',
};

const issueDateTemplate: TemplateDetails = {
  label: 'Issue date',
  field: 'issueDate',
  parser: parseDate,
  type: 'NUMERIC',
};

const firstNameTemplate: TemplateDetails = {
  label: 'First name',
  field: 'firstName',
  parser: parseFirstName,
  type: 'ALPHABETIC',
};

const lastNameTemplate: TemplateDetails = {
  label: 'Last name',
  field: 'lastName',
  parser: parseLastName,
  type: 'ALPHABETIC',
};

const issuingStateTemplate: TemplateDetails = {
  label: 'Issuing state',
  field: 'issuingState',
  parser: parseState,
  type: 'ALPHABETIC',
};

export {
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  documentCodeTemplate,
  nationalityTemplate,
  sexTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  issueDateTemplate,
  compositeCheckDigitTemplate,
  firstNameTemplate,
  lastNameTemplate,
  issuingStateTemplate,
};
