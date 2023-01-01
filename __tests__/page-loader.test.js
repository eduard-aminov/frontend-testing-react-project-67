import { test, expect, describe } from '@jest/globals';
import pageLoader from '../index.js';

describe('page-loader', () => {
  test('page-loader defined', () => {
    expect(pageLoader).toBeDefined();
  });

  test('returns correct result', async () => {
    const result = await pageLoader('https://ru.hexlet.io/courses', '/var/tmp');
    console.log(result);
    expect(result).toMatchObject(expect.objectContaining({
      filepath: expect.stringContaining('.html'),
    }));
  });
});
