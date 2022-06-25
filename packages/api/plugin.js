import { createReadStream, existsSync } from 'fs';

import Router from '@koa/router';
import { BasePlugin, KoaComposer } from 'rugo-common';
import { curry } from 'ramda';

import { createApi } from './src/index.js';
import { exec as _exec } from 'node:child_process';
import { exportApi as doExportApi, importApi as doImportApi, getExportFilePath } from './src/ie-api.js';

const exportApi = async (schemas, model, ctx) => {
  const id = await doExportApi('rugo', schemas, model);
  
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: `/apix/export/${id}`
  }
}

const importApi = async (schemas, model, ctx)  => {
  await doImportApi(schemas, model, ctx.form.data.getLocation());

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: 'Imported!'
  }
}

const getExportApi = async (ctx) => {
  const id = ctx.params.id;
  const outputPath = getExportFilePath(id);

  if (!existsSync(outputPath)){
    ctx.body = 'Not Found';
    ctx.status = 404;
    return;
  }

  ctx.set('Content-Disposition', `inline; filename="${id}.zip"`)
  ctx.body = createReadStream(outputPath);
}

export default {
  ...BasePlugin,

  name: 'api',
  priority: 10,
  depends: ['server', 'model', 'auth', 'schemas'],

  async start (context) {
    const api = createApi(KoaComposer);
    const auth = context.auth(KoaComposer);

    const router = new Router();

    // auth
    router.post('/api/login', auth.login('.form'));

    // normal
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

    // import & export
    router.get('/apix/export', 
      auth.gate('.disableAuthGate', '.headers.authorization', '.'), 
      curry(exportApi)(context.schemas, context.model)
    );

    router.get('/apix/export/:id', getExportApi);

    router.post('/apix/import', 
      auth.gate('.disableAuthGate', '.headers.authorization', '.'), 
      curry(importApi)(context.schemas, context.model)
    );

    // use
    context.server.use(router.routes());
  }
};
