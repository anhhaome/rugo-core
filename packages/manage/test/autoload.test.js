/* eslint-disable */

import { expect } from 'chai';

import autoload from "../src/autoload.js";

process.chdir('./test/fixtures');

describe('autoload test', () => {
  it('should be autoload', async () => {
    const pipeline = await autoload();
    
    expect(pipeline).to.has.property('length', 1);
    expect(pipeline[0]).to.has.property('name', 'test1');
  });
});