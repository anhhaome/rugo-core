export const CACHE_MEM_KEY = 'driver.mem';
export const CACHE_MONGO_KEY = 'driver.mongo';
export const CACHE_FS_KEY = 'driver.fs';

export const DEFAULT_LIMIT = 10;

const MAX_TIME = 99999999999999;
export const ID_TIME_SIZE = MAX_TIME.toString(36).length;
export const ID_PREFIX = 'r';
export const ID_SIZE = 128 / 8;
export const ID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

export const DIRECTORY_MIME = 'inode/directory';

/**
 * Driver structure.
 *
 * @global
 * @typedef {object} Driver
 * @property {Function} getCollection Default get collection.
 * @property {Function} close Default close.
 */
export const DRIVER = {
  getCollection () {},
  close () {}
};

/**
 * Collection structure.
 *
 * @global
 * @typedef {object} Collection
 * @property {Function} id check or get id
 * @property {Function} get Get document by id.
 * @property {Function} count Count no of document returned.
 * @property {Function} list List document by query.
 * @property {Function} create Create a new document.
 * @property {Function} patch Update existed documents.
 * @property {Function} remove Remove documents.
 */
export const COLLECTION = {
  id () {},
  get () {},
  count () {},
  list () {},
  create () {},
  patch () {},
  remove () {}
};

/**
 * Document structure.
 *
 * @global
 * @typedef {object} Document
 * @property {*} _id Id of the document.
 */
