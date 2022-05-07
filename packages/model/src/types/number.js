import { InvalidTypeError, TriggerError } from '../exceptions.js';

/**
 *
 * @param {*} _value
 * @returns
 */
export const type = (_value) => {
  let value = _value;

  if (typeof value === 'string') { value = parseFloat(value); }

  if (typeof value !== 'number' || isNaN(value)) { throw new InvalidTypeError(_value, 'number'); }

  return value;
};

/**
 *
 * @param value
 * @param schemaValue
 * @returns
 */
export const min = (value, schemaValue) => {
  if (value < schemaValue) { throw new TriggerError('lower than', value, schemaValue); }
  return value;
};

/**
 *
 * @param value
 * @param schemaValue
 * @returns
 */
export const max = (value, schemaValue) => {
  if (value > schemaValue) { throw new TriggerError('greater than', value, schemaValue); }
  return value;
};
