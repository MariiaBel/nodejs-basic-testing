// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
];

describe.each(testCases)('simpleCalculator tests with testCase %s', (testItem)=> {
  test(`should ${testItem.action.toLocaleLowerCase()} tow number`, () => {
    expect(simpleCalculator(testItem)).toBe(testItem.expected);
  });
});
