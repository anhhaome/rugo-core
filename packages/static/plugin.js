import createStatic from './src/index.js';
import { BasePlugin } from 'rugo-common';

export default {
  ...BasePlugin,

  name: 'static',
  depends: ['server'],

  async start (context) {
    const { STATIC_ROOT } = process.env;

    context.server.use(createStatic({ root: STATIC_ROOT }));
  }
};
