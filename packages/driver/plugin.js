import colors from 'colors';

import { resolve } from 'path';
import { BasePlugin } from 'rugo-common';
import { createFsDriver, createMemDriver, createMongoDriver } from './src/index.js';

export default {
  ...BasePlugin,

  name: 'driver',
  async start (context) {
    const { DRIVER_ROOT, DRIVER_URI } = process.env;
    const root = DRIVER_ROOT ? resolve(DRIVER_ROOT) : null;

    context.drivers = {
      mem: root ? await createMemDriver({ root, cache: true }) : null,
      fs: root ? await createFsDriver({ root, cache: true }) : null,
      mongo: DRIVER_URI ? await createMongoDriver({ uri: DRIVER_URI, cache: true }) : null
    };

    for (const key in context.drivers) { console.log(colors.yellow('[driver] ') + colors.white(`"${key}" driver is `) + (context.drivers[key] ? colors.green('ready') : colors.red('not ready'))); }
  },
  async close (context) {
    for (const driverName in context.drivers) {
      if (context.drivers[driverName]) { await context.drivers[driverName].close(); }
    }
  }
};
