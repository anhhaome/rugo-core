/* eslint-disable */

import { expect, use } from 'chai';
import { BasePlugin } from "rugo-common";
import chaiSorted from 'chai-sorted';

import createPipeline from '../src/pipeline.js';

use(chaiSorted);

describe('Pipeline test', async () => {
  it('should run', async () => {
    const pluginA = {
      ...BasePlugin,
      start(context) { context.a = 10; }
    };

    const pluginB = {
      ...BasePlugin,
      async start(context) { context.b = 20; }
    };

    const pipeline = [
      pluginA, pluginB
    ];

    const pp = createPipeline(pipeline);
    const context = await pp.start();
    const context2 = await pp.close();

    expect(context).to.has.property('a', 10);
    expect(context).to.has.property('b', 20);
    expect(context).to.be.eq(context2);

    expect(pipeline).to.has.property('length', 2);
  });

  it('should run with priority', async () => {
    const pipeline = [];
    const order = [];

    for (let i = 0; i < 10; i++){
      let priority = Math.floor(Math.random() * 10);

      pipeline.push({
        ...BasePlugin,

        priority,
        start(){ order.push(this.priority); }
      });
    }

    const pp = createPipeline(pipeline);
    await pp.start();

    expect(order).to.has.property('length', 10);
    expect(order).to.be.sorted();
  });

  it('should run with depends and priority', async () => {
    const order = [];
    const pipeline = [
      { ...BasePlugin, priority: 10, depends: ['a', 'b'], start(context){ context.e = 1; order.push(4); } },
      { ...BasePlugin, depends: ['a'], start(context){ context.b = 1; order.push(2); } },
      { ...BasePlugin, start(context){ context.a = 1; order.push(1); } },
      { ...BasePlugin, priority: 9, depends: ['a', 'b'], start(context){ context.c = 1; order.push(3); } },
      { ...BasePlugin, priority: 1, start(context){ context.d = 1; order.push(0); } }
    ];

    const pp = createPipeline(pipeline);
    await pp.start();

    expect(order).to.has.property('length', pipeline.length);
    expect(order).to.be.sorted();
  });

  it('should not run some plugins', async () => {
    const pipeline = [
      { ...BasePlugin, depends: ['a', 'b'] },
      { ...BasePlugin, depends: ['d'] },
      { ...BasePlugin, start(context){ context.a = 1; } }
    ];

    const stats = {};
    const pp = createPipeline(pipeline, {}, stats);
    const context = await pp.start();
    
    expect(stats).to.has.property('doNotStarts');
    expect(stats).to.has.property('starts');
    
    expect(stats.doNotStarts).to.has.property('length', 2);
    expect(stats.starts).to.has.property('length', 1);

    expect(context).to.has.property('a', 1);
  });
});
