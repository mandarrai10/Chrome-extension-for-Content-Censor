// opt.test.js
const chai = require('chai');
const expect = chai.expect;
const { buildSaveArray } = require('../src/opt');

describe('buildSaveArray Function', function () {
  it('should build the saveArray correctly with a valid string input', function () {
    const input = 'example'; // Provide a valid input string
    const expectedOutput = [
      {
        keyword: 'example',
        type: '1',
        replace: 'string',
      },
    ];

    const result = buildSaveArray(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('should handle an empty string input', function () {
    const input = ''; // Provide an empty string input
    const expectedOutput = []; // Since it's empty, the output should be an empty array

    const result = buildSaveArray(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('should handle uppercase string input', function () {
    const input = 'UPPERCASE'; // Provide an uppercase string input
    const expectedOutput = [
      {
        keyword: 'UPPERCASE',
        type: '1',
        replace: 'string',
      },
    ]; // The output should contain the uppercase string

    const result = buildSaveArray(input);

    expect(result).to.deep.equal(expectedOutput);
  });
});
