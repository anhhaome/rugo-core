import { join } from 'path';

import { Low, JSONFile } from 'lowdb';
import { curry, find, propEq, whereEq, count, keys, compose, descend, prop, ascend, sortWith, drop, take, pipe, curryN, filter, map, forEach, length } from 'ramda';

import createMemoizeWith from './memoize.js';

import { CACHE_MEM_KEY, DRIVER, COLLECTION, DEFAULT_LIMIT } from './constants.js';
import generateId from './id.js';

/**
 * Generate id or check.
 *
 * @param {*} id Id to check. Optional.
 * @returns {*} Checked Id or a new ID.
 */
const doId = id => id || generateId();

/**
 * Create a new document
 *
 * @async
 * @param {LowDB} db LowDB object, for read and write. Required.
 * @param {Document} doc A document to be created. Required.
 * @returns {Document} A created document.
 */
const doCreate = async (db, doc) => {
  const newDoc = {
    // basic info
    _id: doId(),

    // document
    ...doc
  };

  db.data.push(newDoc);
  await db.write();

  return newDoc;
};

/**
 * Get a document by id.
 *
 * @param {LowDB} db LowDB object, for read and write. Required.
 * @param {*} id Id of document need to find.
 * @returns {Document} Document needed.
 */
const doGet = (db, id) => {
  return find(propEq('_id', id))(db.data);
};

/**
 * Count document by query.
 *
 * @param {LowDB} db LowDB object, for read and write. Required.
 * @param {object} query Match exact query object.
 * @returns {number} Count.
 */
const doCount = (db, query) => {
  return count(whereEq(query))(db.data);
};

/**
 * List documents.
 *
 * @param {LowDB} db LowDB object, for read and write. Required.
 * @param {object} query Match exact query object.
 * @param {object} controls Control list result, maybe contains: $limit, $sort, $skip
 * @returns {object} List result, contains: total (total of query result), skip (no skip documents), limit (no limit documents), data (list document).
 */
const doList = (db, query, controls = {}) => {
  const pipeline = [filter(whereEq(query))];

  if (controls.$sort) {
    pipeline.push(
      sortWith(
        compose(
          map(k => controls.$sort[k] === -1 ? descend(prop(k)) : ascend(prop(k))),
          keys
        )(controls.$sort)
      )
    );
  }

  if (controls.$skip) { pipeline.push(drop(controls.$skip)); }

  const limit = typeof controls.$limit === 'number' ? controls.$limit : DEFAULT_LIMIT;
  if (limit !== -1) { pipeline.push(take(limit)); }

  return {
    total: doCount(db, query),
    skip: controls.$skip || 0,
    limit,
    data: pipe(...pipeline)(db.data)
  };
};

/**
 * Patch documents.
 *
 * @async
 * @param {LowDB} db LowDB object, for read and write. Required.
 * @param {object} query Match exact query object.
 * @param {object} controls Control list result, maybe contains: $set, $inc.
 * @returns {number} No of changed documents.
 */
const doPatch = async (db, query, controls = {}) => {
  const pipeline = [filter(whereEq(query))];

  if (controls.$set) {
    pipeline.push(
      forEach(doc => {
        for (const key in controls.$set) {
          doc[key] = controls.$set[key];
        }
      })
    );
  }

  if (controls.$inc) {
    pipeline.push(
      forEach(doc => {
        for (const key in controls.$inc) {
          if (typeof doc[key] === 'number') { doc[key] += controls.$inc[key]; }
        }
      })
    );
  }

  pipeline.push(length);
  const result = pipe(...pipeline)(db.data);
  await db.write();

  return result;
};

/**
 * Remove documents
 *
 * @param {LowDB} db LowDB object, for read and write. Required.
 * @param {object} query Match exact query object.
 * @returns {number} No removed document.
 */
const doRemove = async (db, query) => {
  const pred = whereEq(query);

  let index = 0;
  let result = 0;
  while (index < db.data.length) {
    if (pred(db.data[index])) {
      db.data.splice(index, 1);
      result++;
      continue;
    }

    index++;
  }

  await db.write();

  return result;
};

/**
 * Get collection for data processing. Each collection is stored with one file.
 *
 * @async
 * @param {string} root Root directory to store collection. Required.
 * @param {string} name Collection name. Required.
 * @returns {Collection} Collection handlers.
 */
const getCollection = async (root, name) => {
  const file = join(root, name);
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  await db.read();

  db.data ||= [];

  await db.write();

  return {
    ...COLLECTION,

    id: doId,
    create: curry(doCreate)(db),
    get: curry(doGet)(db),
    count: curry(doCount)(db),
    list: curryN(2, doList)(db),
    patch: curryN(2, doPatch)(db),
    remove: curry(doRemove)(db)
  };
};

const memoizedGetCollection = createMemoizeWith(CACHE_MEM_KEY, join, getCollection);

/**
 * Mem Driver is a driver store data in memory and file system. It's fast, lightweight and ready for quick saving.
 *
 * It use LowDB as a core for read and save. Ramda is used for data query.
 *
 * This function create Mem Driver for use.
 *
 * @async
 * @param {object} config Driver configuration.
 * @param {string} config.root Root directory to store collection. Required.
 * @param {boolean} config.cache Enable cache. Default: `false`.
 * @returns {Driver} Driver handler.
 */
const createMemDriver = async ({ root, cache }) => {
  return {
    ...DRIVER,

    getCollection: (cache ? memoizedGetCollection : curry(getCollection))(root)
  };
};
const memoizedCreateMemDriver = createMemoizeWith(CACHE_MEM_KEY, prop('root'), createMemDriver, prop('cache'));

export default memoizedCreateMemDriver;
