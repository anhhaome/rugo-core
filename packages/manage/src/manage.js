#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import dotenv from 'dotenv';
import createRunner from './index.js';

const commander = yargs(hideBin(process.argv));

commander.command('start', 'Start platform in development mode.', async () => {
  dotenv.config();

  await createRunner();
});

commander.parse();
