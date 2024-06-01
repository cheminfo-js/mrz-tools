export interface Autocorrect {
  line: number;
  column: number;
  original: string;
  corrected: string;
}

export interface Details {
  label: string;
  field: FieldName | null;
  value: string | null;
  valid: boolean;
  ranges: Range[];
  line: number;
  start: number;
  end: number;
  error?: string;
  autocorrect: Autocorrect[];
}

export interface Range {
  line: number;
  start: number;
  end: number;
}

export interface ParseResult {
  format: MRZFormat;
  valid: boolean;
  fields: FieldRecords;
  documentNumber: string | null;
  details: Details[];
}

export type FieldRecords = Partial<Record<FieldName, string | null>>;

export type FieldName =
  | 'administrativeCode'
  | 'administrativeCode2'
  | 'birthDate'
  | 'birthDateCheckDigit'
  | 'compositeCheckDigit'
  | 'documentNumber'
  | 'documentNumberCheckDigit'
  | 'documentCode'
  | 'expirationDate'
  | 'expirationDateCheckDigit'
  | 'firstName'
  | 'issueDate'
  | 'issuingState'
  | 'languageCode'
  | 'lastName'
  | 'nationality'
  | 'optional'
  | 'optional1'
  | 'optional2'
  | 'personalNumber'
  | 'personalNumberCheckDigit'
  | 'pinCode'
  | 'sex'
  | 'versionNumber';

export type MRZFormat =
  | 'TD1'
  | 'TD3'
  | 'TD2'
  | 'FRENCH_NATIONAL_ID'
  | 'FRENCH_DRIVING_LICENSE'
  | 'SWISS_DRIVING_LICENSE';
