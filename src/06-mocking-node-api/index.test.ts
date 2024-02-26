// Uncomment the code below and write your tests
import path from 'path';
import {  doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn()
}))

describe('doStuffByTimeout', () => {
  const timeout = 1000,
      callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout')
    doStuffByTimeout(callback,timeout)
  })

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout)
  });

  test('should call callback only after timeout', () => {
    expect(callback).not.toBeCalled()
    jest.runAllTimers()
    expect(callback).toBeCalled()
  });
});

describe('doStuffByInterval', () => {
  const interval = 1000;
  let callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    callback = jest.fn()
    jest.spyOn(global, 'setInterval')
    doStuffByInterval(callback, interval)
  })

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    expect(setInterval).toBeCalledWith(callback, interval)
  });

  test('should call callback multiple times after multiple intervals', () => {
    for(let counter of [1, 2, 3]) {
      jest.runOnlyPendingTimers()
      expect(callback).toBeCalledTimes(counter)
    }
  });
});

describe('readFileAsynchronously', () => {
  
  const pathToFile = './index.ts'

  beforeAll(() => {
  })

  afterAll(() => {
    jest.unmock('fs')
  })

  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join')

    await readFileAsynchronously(pathToFile)

    expect(path.join).toBeCalledWith(__dirname, pathToFile)
  });

  test('should return null if file does not exist', async () => {

    jest.mocked(existsSync).mockReturnValue(false)

    const result = await readFileAsynchronously(pathToFile)

    expect(result).toBeNull()
  });

  test('should return file content if file exists', async () => {
    const content = 'text from file'
    
    jest.mocked(readFile).mockResolvedValue(content)
    jest.mocked(existsSync).mockReturnValue(true)

    const result = await readFileAsynchronously(pathToFile)

    expect(result).toBe(content)
  });
});
