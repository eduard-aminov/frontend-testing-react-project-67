import { test, expect } from '@jest/globals';
import pageLoader from '../index.js';

test('page-loader', () => {
  expect(pageLoader).toBeDefined();
});
