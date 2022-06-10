import createView from './src/index.js';
import { BasePlugin } from 'rugo-common';

export default {
  ...BasePlugin,

  name: 'view',
  depends: ['server', 'model'],

  async start (context) {
    const { VIEW_ROOT } = process.env;

    context.server.use(async (ctx, next) => {
      ctx.state.model = context.model;
      await next();
    });
    
    context.server.use(createView({ root: VIEW_ROOT }));
  }
};
