// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a:2, b:1, action: Action.Add})).toBe(3)
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a:2, b:1, action: Action.Subtract})).toBe(1)
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a:2, b:1, action: Action.Multiply})).toBe(2)
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a:4, b:2, action: Action.Divide})).toBe(2)
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a:2, b:2, action: Action.Exponentiate})).toBe(4)
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a:2, b:2, action: 'invalidExtion'})).toBe(null)
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a:'abc', b:[2], action: Action.Add})).toBe(null)
  });
});
