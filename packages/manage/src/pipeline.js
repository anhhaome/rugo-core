import { clone, difference, keys, prop, sortBy } from 'ramda';

/**
 * @global
 * @typedef {Array.<plugin>} Pipeline
 */

/**
 * Start a pipeline
 *
 * @param {Pipeline} pipeline Plugin list.
 * @param {object} context Sharable object.
 * @param {object} stats Stats object.
 * @returns {object} Return context.
 */
const startPipeline = async (pipeline, context, stats) => {
  // init
  stats.doNotStarts = [];
  stats.starts = [];

  const findNext = () => {
    for (let i = 0; i < pipeline.length; i++){
      if (pipeline[i].depends.length === 0) {
        return pipeline.splice(i, 1)[0];
      }
    }

    return null;
  };

  let next = findNext();

  // execute context
  const result = [];
  while (next) {
    const plugin = next;

    await plugin.start(context);

    const _keys = keys(context);
    for (const plugin of pipeline) {
      plugin.depends = difference(plugin.depends, _keys);
    }

    next = findNext();

    result.push(plugin);
    stats.starts.push(plugin.name);
  }

  while (pipeline.length) {
    stats.doNotStarts.push(pipeline.shift().name);
  }

  while (result.length) pipeline.push(result.shift());

  return context;
};

/**
 * Close pipeline.
 *
 * @param {Pipeline} pipeline Plugin list.
 * @param {object} context Sharable object.
 * @param {object} stats Stats object.
 * @returns {object} Return context.
 */
const closePipeline = async (pipeline, context, stats) => {
  for (const plugin of pipeline) { await plugin.close(context); }

  return context;
};

/**
 * Create pipeline handle.
 *
 * @param {Pipeline} pipeline Plugin list.
 * @param {object} context Sharable object.
 * @param {object} stats Stats object.
 * @returns {object} Return context.
 */
const createPipeline = (pipeline, context = {}, stats = {}) => {
  // clone and sort by priority
  const _pipeline = sortBy(prop('priority'), clone(pipeline));

  context.onStarted = [];
  context.onClosed = [];

  return {
    context,
    stats,

    async start () { 
      const result = await startPipeline(_pipeline, context, stats); 

      for (let fn of context.onStarted)
        await fn(context);

      return result;
    },
    
    async close () {
      const result = await closePipeline(_pipeline, context, stats); 

      for (let fn of context.onClosed)
        await fn(context);

      return result;
    }
  };
};
export default createPipeline;
