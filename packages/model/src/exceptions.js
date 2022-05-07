export class InvalidTypeError extends Error {
  constructor (value, type) {
    super(`"${value}" is not a ${type}`);
  }
}

export class TriggerError extends Error {
  constructor (type, value, expect) {
    super(`"${value}" is ${type} ${expect}`);
  }
}
