import { InvalidTypeError } from '../exceptions.js';

/**
 * Validate text type.
 *
 * @param {*} value Value to validate
 * @returns {string} Validated value
 */
export const type = (value) => {
  if (typeof value !== 'string') { throw new InvalidTypeError(value, 'text'); }

  return value;
};

/**
 * Validate min length of value.
 *
 * @param {*} value Value to validate
 * @param {object} schemaValue Schema value to validate
 * @returns {string} Validated value.
 */
export const minlength = (value, schemaValue) => {
  if (value.length < schemaValue) { throw new Error(`"${value}" length is lower than ${schemaValue}`); }
  return value;
};

/**
 * Validate max length of value.
 *
 * @param {*} value Value to validate
 * @param {object} schemaValue Schema value to validate
 * @returns {string} Validated value.
 */
export const maxlength = (value, schemaValue) => {
  if (value.length > schemaValue) { throw new Error(`"${value}" length is greater than ${schemaValue}`); }
  return value;
};

/**
 * Validate value matching regex.
 *
 * @param {*} value Value to validate
 * @param {object} schemaValue Schema value to validate
 * @returns {string} Validated value.
 */
export const regex = (value, schemaValue) => {
  const r = new RegExp(schemaValue);
  if (!r.test(value)) { throw new Error(`"${value}" is not match regex`); }
  return value;
};

/**
 * Trim value
 *
 * @param {*} value Value to transform
 * @returns {string} Transformed value.
 */
export const trim = value => value.trim();

/**
 * To lowercase value
 *
 * @param {*} value Value to transform
 * @returns {string} Transformed value.
 */
export const lowercase = value => value.toLowerCase();

/**
 * To uppercase value
 *
 * @param {*} value Value to transform
 * @returns {string} Transformed value.
 */
export const uppercase = value => value.toUpperCase();

/**
 * Validate value in set.
 *
 * @param {*} value Value to validate
 * @param {object} schemaValue Schema value to validate
 * @returns {string} Validated value.
 */
export const choice = (value, schemaValue) => {
  if (schemaValue.indexOf(value) === -1) {
    throw new Error(`"${value}" is not valid enum`);
  }
  return value;
};
