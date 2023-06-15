'use strict';

import { formats } from './formats';
import states from './generated/states';

/* Exporting the default export from the parse module. */
export { default as parse } from './parse/parse';

/* Exporting the `formats` and `states` variables from the `index.ts` file. */
export { formats, states };

// Types
export {
  ParseMRZOptions,
  Formats,
  DefaultRecord,
  FrenchNationalRecord,
  SwissDrivingLicense,
  Td1Record,
  Td2Record,
  Td3Record,
  CombinedRecord,
  Autocorrect,
  Details,
  Record,
  FieldTypes,
  TemplateDetails,
  ParseResult,
  FieldOptions,
  Range,
  Results,
  CreateFieldParserResult,
} from './types';
