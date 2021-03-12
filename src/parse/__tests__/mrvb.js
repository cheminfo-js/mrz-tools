'use strict';

const parse = require('../parse');

describe('parse MRV-B', () => {
  it('Utopia example', function () {
    const MRZ = [
      'V<UTOHENG<<DEBORAH<MING<LO<<<<<<<<<<',
      'L8988901C4XXX4009078F9612109<<<<<<<<',
    ];

    const result = parse(MRZ);
    expect(result).toMatchObject({
      valid: false,
      format: 'MRVB',
    });
    expect(result.valid).toBe(false);
    const errors = result.details.filter((a) => !a.valid);
    expect(errors).toHaveLength(1);
    expect(result.fields).toStrictEqual({
      documentCode: 'V',
      firstName: 'DEBORAH MING LO',
      lastName: 'HENG',
      documentNumber: 'L8988901C',
      documentNumberCheckDigit: '4',
      nationality: 'XXX',
      sex: 'female',
      expirationDate: '961210',
      expirationDateCheckDigit: '9',
      birthDate: '400907',
      birthDateCheckDigit: '8',
      issuingState: null,
      optionalData: '',
    });

    const personalNumberDetails = result.details.find(
      (d) => d.field === 'nationality',
    );
    expect(personalNumberDetails).toStrictEqual({
      label: 'Nationality',
      field: 'nationality',
      value: 'XXX',
      valid: true,
      ranges: [{ line: 1, start: 10, end: 13, raw: 'XXX' }],
      line: 1,
      start: 10,
      end: 13,
    });
  });

  it('Finland visa', () => {
    const MRZ = [
      'V<FINSMITH<JONES<<SUSIE<MARGARET<<<<',
      'L898902C<3USA6908061F9406236ZE184226',
    ];

    const result = parse(MRZ);
    expect(result).toMatchObject({
      valid: true,
      format: 'MRVB',
    });
    expect(result.valid).toBe(true);
    expect(result.fields).toStrictEqual({
      documentCode: 'V',
      issuingState: 'FIN',
      lastName: 'SMITH JONES',
      firstName: 'SUSIE MARGARET',
      documentNumber: 'L898902C',
      documentNumberCheckDigit: '3',
      nationality: 'USA',
      birthDate: '690806',
      birthDateCheckDigit: '1',
      sex: 'female',
      expirationDate: '940623',
      expirationDateCheckDigit: '6',
      optionalData: 'ZE184226',
    });
  });
});
