// Uncomment the code below and write your tests
import { throwError, resolveValue, throwCustomError, MyAwesomeError,rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('some value')).toBe('some value')
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => {
      throwError('catch error')
    }).toThrow('catch error')
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError()
    }).toThrow('Oops!')
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError()
    }).toThrow(new MyAwesomeError())
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError)
  });
});
