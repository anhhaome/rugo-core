import Router from '@koa/router';
import { BasePlugin, KoaComposer } from 'rugo-common';
import { createApi } from './src/index.js';

export default {
  ...BasePlugin,

  name: 'api',
  priority: 10,
  depends: ['server', 'model', 'auth'],

  async start (context) {
    const api = createApi(KoaComposer);
    const auth = context.auth(KoaComposer);

    const router = new Router();

    router.post('/api/login', auth.login('.form'));
    router.use('/api/:modelName', auth.gate('.disableAuthGate', '.headers.authorization', '.'), async (ctx, next) => {
      ctx.model = await context.model(ctx.params.modelName);

      if (ctx.model) { return await next(); }

      ctx.status = 404;
      ctx.body = 'Not found';
    });
    router.get('/api/:modelName', api('.model', 'list', '.query'));
    router.get('/api/:modelName/:id', api('.model', 'get', '.params.id'));
    router.post('/api/:modelName', api('.model', 'create', '.form'));
    router.patch('/api/:modelName/:id', api('.model', 'patch', '.params.id', '.form'));
    router.delete('/api/:modelName/:id', api('.model', 'remove', '.params.id'));

    context.server.use(router.routes());
  }
};
