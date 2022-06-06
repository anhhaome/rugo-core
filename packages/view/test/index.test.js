/* eslint-disable */

import fs from 'fs';
import { expect } from 'chai';
import createView from '../src/index.js';

const createContext = (url) => ({
  method: 'GET',
  url,
  request: { body: null }
});

const renderedContent = filePath => {
  return fs.readFileSync(filePath).toString();
}

describe('View test', () => {
  it('should create view', async () => {
    const view = createView({ root: './test/fixtures/basic' });
    const ctx = createContext('/');

    await view(ctx);

    expect(ctx).to.has.property('status', 200);
    expect(ctx).to.has.property('body', renderedContent('./test/fixtures/basic/index.html'));
  });

  it('should get not found view', async () => {
    const view = createView({ root: './test/fixtures/basic' });
    const ctx = createContext('/no-view');

    await view(ctx);

    expect(ctx).to.has.property('status', 404);
    expect(ctx).to.has.property('body', 'Not found');
  });
});