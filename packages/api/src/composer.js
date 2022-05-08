import objectPath from 'object-path';
import { curry, curryN } from 'ramda';

/**
 * @global
 * @typedef {object} Composer
 * @property {Function} argsParser Argument parser.
 * @property {Function} returnParser Return parser.
 */
export const BaseComposer = {
  argsParser: validateArgs => validateArgs,
  returnParser: result => result
};

export const KoaComposer = {
  ...BaseComposer,

  argsParser: curry((validateArgs, { 0: context }) =>
    validateArgs.map(
      arg => typeof arg === 'string' && arg[0] === '.' ? objectPath.get(context, arg.substring(1)) : arg
    )
  ),

  returnParser: curryN(2, async (result, { 0: context, 1: next = () => {} }) => {
    const { status, data } = result;

    context.status = status;
    context.body = {
      status: status === 200 ? 'success' : 'error',
      data: null
    };

    if (data) { context.body.data = data; }

    await next();

    return result;
  })
};
