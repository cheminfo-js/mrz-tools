'use strict';

export type Formats =
  | 'TD1'
  | 'TD2'
  | 'TD3'
  | 'SWISS_DRIVING_LICENSE'
  | 'FRENCH_NATIONAL_ID';

export type DefaultRecord =
  | 'documentNumber'
  | 'documentNumberCheckDigit'
  | 'documentCode'
  | 'nationality'
  | 'sex'
  | 'expirationDate'
  | 'expirationDateCheckDigit'
  | 'compositeCheckDigit'
  | 'birthDate'
  | 'birthDateCheckDigit'
  | 'issueDate'
  | 'lastName'
  | 'firstName'
  | 'issuingState';

export type FrenchNationalRecord =
  | 'administrativeCode'
  | 'administrativeCode2'
  | DefaultRecord;

export type SwissDrivingLicense =
  | 'languageCode'
  | 'pinCode'
  | 'versionNumber'
  | DefaultRecord;

export type Td1Record = 'optional1' | 'optional2' | DefaultRecord;

export type Td2Record = 'optional' | DefaultRecord;

export type Td3Record =
  | 'personalNumber'
  | 'personalNumberCheckDigit'
  | DefaultRecord;

export type CombinedRecord =
  | FrenchNationalRecord
  | SwissDrivingLicense
  | Td1Record
  | Td2Record
  | Td3Record;

export interface Autocorrect {
  line: number;
  column: number;
  original: string;
  corrected: string;
}

export interface Details {
  label: string;
  field: CombinedRecord | null;
  value: string | null;
  valid: boolean;
  ranges: Range[];
  line: number;
  start: number;
  end: number;
  error?: string;
  autocorrect: Autocorrect[];
}

export type Record = {
  fields: { [key in CombinedRecord]?: string | null };
  valid: boolean;
};

export type FieldTypes = 'NUMERIC' | 'ALPHABETIC' | 'ALPHANUMERIC';

export type TemplateDetails = {
  label: string;
  field: CombinedRecord | null;
  parser?: Parser;
  type: FieldTypes;
};

export interface ParseResult {
  value: string;
  start: number;
  end: number;
}

export type Parser = (
  source: string,
  ...related: string[]
) => ParseResult | string;

export type FieldOptions = {
  label: string;
  field: CombinedRecord | null;
  line: number;
  start: number;
  end: number;
  parser?: Parser;
  related?: Range[];
  type?: FieldTypes;
};

export interface Range {
  line: number;
  start: number;
  end: number;
}

export type Results = {
  format: Formats;
  details: Details[];
  fields: { [key in CombinedRecord]?: string | null };
  valid: boolean;
};

export interface ParseMRZOptions {
  autocorrect?: boolean;
}

export interface CreateFieldParserResult {
  parser: (lines: string[], autocorrect?: Autocorrect[]) => Details;
  autocorrector: (lines: string[]) => {
    correctedLines: string[];
    autocorrect: Autocorrect[];
  };
}
