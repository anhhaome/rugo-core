import { BasePlugin } from 'rugo-common';
import createModel from './src/index.js';

export default {
  ...BasePlugin,

  name: 'model',
  depends: ['drivers'],

  async start (context) {
    const schemas = JSON.parse(process.env.MODEL_SCHEMAS);
    const models = {};

    const makeModel = async name => {
      if (models[name]) { return models[name]; }

      for (const schema of schemas) {
        if (schema.__name === name) {
          models[name] = await createModel(context.drivers[schema.__type], schema);
          return models[name];
        }
      }

      return null;
    };

    context.model = makeModel;
  },
  async close () {

  }
};
