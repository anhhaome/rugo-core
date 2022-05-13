import colors from 'colors';
import { BasePlugin } from 'rugo-common';
import createServer from './src/index.js';

export default {
  ...BasePlugin,

  name: 'server',
  async start (context) {
    const { PORT } = process.env;

    const server = createServer(PORT);

    await server.listen();
    console.log(colors.yellow('[server] ') + colors.white('Server is running at: ') + colors.green(server.address()));

    context.server = server;
  },
  async close (context) {
    await context.server.close();
  }
};
