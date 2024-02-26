// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios')
jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  const expectedBaseUrl = 'https://jsonplaceholder.typicode.com',
    endpoint = '/product',
    data = {
      id: 1,
      title: 'Title',
    };
  let result = {};

  beforeEach(async() => {
    jest.mocked(axios.create).mockReturnValue(axios)
    jest.mocked(axios.get).mockResolvedValue({data})

    result = await throttledGetDataFromApi(endpoint)
  })
  
  test('should create instance with provided base url', async () => {
    expect(axios.create).toHaveBeenCalledWith({ baseURL: expectedBaseUrl})
  });

  test('should perform request to correct provided url', async () => {
    expect(axios.get).toHaveBeenCalledWith(endpoint);
  });

  test('should return response data', async () => {
    expect(result).toEqual(data)
  });
});
