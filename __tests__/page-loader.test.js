import * as path from 'path';
import * as os from 'os';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

import {
  afterAll,
  beforeAll,
  beforeEach,
  expect,
  test,
} from '@jest/globals';
import nock from 'nock';
import pageLoader from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const destPath = path.join(os.tmpdir());
const responseFixturePath = getFixturePath('response.html');

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.enableNetConnect();
});

beforeEach(async () => {
  await fs.unlink(destPath).catch(() => {});
});

test('page-loader', async () => {
  const responseFixture = await fs.readFile(responseFixturePath, 'utf-8');

  nock(/ru\.hexlet\.io/)
    .get(/\/courses/)
    .reply(200, responseFixture);

  const result = await pageLoader('https://ru.hexlet.io/courses', destPath);

  expect(result).toMatchObject(expect.objectContaining({
    filepath: expect.stringContaining('.html'),
  }));

  const actual = await fs.readFile(result.filepath, 'utf-8');
  expect(actual).toEqual(responseFixture);
});
