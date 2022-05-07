import { InvalidTypeError } from '../exceptions.js';

/**
 *
 * @param {*} value
 * @returns
 */
export const type = (value) => {
  if (typeof value !== 'string') { throw new InvalidTypeError(value, 'text'); }

  return value;
};

/**
 *
 * @param {*} value
 * @param schemaValue
 * @returns
 */
export const minlength = (value, schemaValue) => {
  if (value.length < schemaValue) { throw new Error(`"${value}" length is lower than ${schemaValue}`); }
  return value;
};

/**
 *
 * @param {*} value
 * @param schemaValue
 * @returns
 */
export const maxlength = (value, schemaValue) => {
  if (value.length > schemaValue) { throw new Error(`"${value}" length is greater than ${schemaValue}`); }
  return value;
};

/**
 *
 * @param {*} value
 * @param schemaValue
 * @returns
 */
export const regex = (value, schemaValue) => {
  const r = new RegExp(schemaValue);
  if (!r.test(value)) { throw new Error(`"${value}" is not match regex`); }
  return value;
};

/**
 *
 * @param {*} value
 * @returns
 */
export const trim = value => value.trim();

/**
 *
 * @param {*} value
 * @returns
 */
export const lowercase = value => value.toLowerCase();

/**
 *
 * @param {*} value
 * @returns
 */
export const uppercase = value => value.toUpperCase();

/**
 *
 * @param {*} value
 * @param schemaValue
 * @returns
 */
export const choice = (value, schemaValue) => {
  if (schemaValue.indexOf(value) === -1) {
    throw new Error(`"${value}" is not valid enum`);
  }
  return value;
};
