/* eslint-disable */

import { expect } from 'chai';

import { BaseComposer, KoaComposer } from "../src/composer.js";

describe('Composer test', () => {
  it('should be test default', async () => {
    const args = await BaseComposer.argsParser([1, 2, 3]);
    expect(args).to.have.ordered.members([1, 2, 3]);

    const result = await BaseComposer.returnParser(1);
    expect(result).to.be.eq(1);
  });

  it('should be test koa', async () => {
    const context = { params: { id: 1 }};

    const args = await KoaComposer.argsParser(['.params.id', 2, '3'])([context]);
    expect(args).to.have.ordered.members([1, 2, '3']);

    const result = await KoaComposer.returnParser({ status: 200, data: 'ok' })([context]);

    expect(result).to.deep.equal({ status: 200, data: 'ok' });
    expect(context).to.has.property('status', 200);
    expect(context).to.has.property('body');
    expect(context.body).to.has.property('status', 'success');
    expect(context.body).to.has.property('data', 'ok');

    const result2 = await KoaComposer.returnParser({ status: 400, data: 'ok' })([context]);
    expect(result2).to.deep.equal({ status: 400, data: 'ok' });
    expect(context).to.has.property('status', 400);
    expect(context).to.has.property('body');
    expect(context.body).to.has.property('status', 'error');
    expect(context.body).to.has.property('data', 'ok');
  });
});
