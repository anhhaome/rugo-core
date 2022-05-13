import { createLogin, createGate } from './src/index.js';
import { curryN } from 'ramda';
import { BasePlugin } from 'rugo-common';

export default {
  ...BasePlugin,

  name: 'auth',
  depends: ['model'],

  async start (context) {
    const { AUTH_SECRET } = process.env;
    const userModel = await context.model('users');

    context.auth = composer => ({
      login: curryN(3, createLogin(composer))(AUTH_SECRET, userModel),
      gate: curryN(3, createGate(composer))(AUTH_SECRET, userModel)
    });
  }
};
