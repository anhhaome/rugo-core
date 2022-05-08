#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import dotenv from 'dotenv';
import colors from 'colors';

import autoload from './autoload.js';
import createPipeline from './pipeline.js';

const commander = yargs(hideBin(process.argv));

commander.command('start', 'Start platform in development mode.', async () => {
  dotenv.config();

  const pipeline = await autoload();
  const stats = {};
  const pp = createPipeline(pipeline, {}, stats);

  await pp.start();

  console.log(colors.yellow('[Rugo Manage]'));
  console.log(colors.green(`- Started: ${stats.starts.join(', ')} (${stats.starts.length}/${pipeline.length})`));
  console.log(colors.green(`- Unstarted: ${stats.doNotStarts.join(', ')} (${stats.doNotStarts.length}/${pipeline.length})`));
});

commander.parse();
