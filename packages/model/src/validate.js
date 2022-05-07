import * as _types from './types/index.js';

export const types = {
  ..._types
};

/**
 * @param {*} value
 * @returns {*}
 */
const isEmptyValue = value => value === null || value === undefined;

/**
 *
 * @param {*} schema
 * @param {*} doc
 * @param {*} patchMode
 * @returns {Document}
 */
const validate = (schema, doc, patchMode) => {
  const validatedDoc = {};

  // validate and transform data
  for (const [fieldName, fieldSchema] of Object.entries(schema)) {
    const docValue = doc[fieldName];

    // required trigger
    if (!patchMode && fieldSchema.required && isEmptyValue(docValue)) { throw new Error(`value of field "${fieldName}" is required`); }

    if (patchMode && fieldSchema.required && docValue === null) { throw new Error(`value of field "${fieldName}" is required`); }

    if (patchMode && fieldSchema.required && isEmptyValue(docValue)) { continue; }

    let value = docValue;

    // not null docValue
    if (!isEmptyValue(value)) {
      const typeHandler = types[fieldSchema.type];
      value = typeHandler.type(docValue);

      // triggers
      for (const [triggerName, triggerValue] of Object.entries(fieldSchema)) {
        if (triggerName === 'type') { continue; }

        if (typeHandler[triggerName]) {
          value = typeHandler[triggerName](value, triggerValue, types);
        }
      }
    }

    // not null value
    if (!isEmptyValue(value)) {
      validatedDoc[fieldName] = value;
      continue;
    }

    // null value
    if (patchMode && value === null) {
      validatedDoc[fieldName] = value;
      continue;
    }

    // default
    if (!patchMode && isEmptyValue(value) && fieldSchema.default !== undefined) {
      validatedDoc[fieldName] = fieldSchema.default;
      continue;
    }
  }

  return validatedDoc;
};

export default validate;
