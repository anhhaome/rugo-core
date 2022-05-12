import bcrypt from 'bcryptjs';
import { PASSWORD_SALT } from '../constants.js';
import { InvalidTypeError } from '../exceptions.js';

/**
 *
 * @param {*} value
 * @returns
 */
export const type = (value) => {
  if (typeof value !== 'string') { throw new InvalidTypeError(value, 'password'); }

  return bcrypt.hashSync(value, PASSWORD_SALT);
};
