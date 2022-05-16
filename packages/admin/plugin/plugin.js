import Router from '@koa/router';
import { BasePlugin, KoaComposer, wrapComposer } from 'rugo-common';

export default {
  ...BasePlugin,

  name: 'admin',
  priority: 5,
  depends: ['server', 'schemas', 'auth'],

  async start (context) {
    const auth = context.auth(KoaComposer);
    const adminApi = wrapComposer(async () => {
      return {
        status: 200,
        data: context.schemas
      };
    })(KoaComposer);

    const router = new Router();

    router.get('/api/info', auth.gate('.disableAuthGate', '.headers.authorization', '.'), adminApi());

    context.server.use(router.routes());
  }
};
