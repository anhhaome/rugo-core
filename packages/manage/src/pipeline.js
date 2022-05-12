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
  const queue = [];

  // init
  stats.doNotStarts = [];
  stats.starts = [];

  const pushEmptyDepends = () => {
    let i = 0;
    while (i < pipeline.length) {
      if (pipeline[i].depends.length === 0) {
        queue.push(pipeline.splice(i, 1)[0]);
        continue;
      }

      i++;
    }
  };

  pushEmptyDepends();

  // execute context
  const result = [];
  while (queue.length !== 0) {
    const plugin = queue.shift();

    await plugin.start(context);

    const _keys = keys(context);
    for (const plugin of pipeline) {
      plugin.depends = difference(plugin.depends, _keys);
    }

    pushEmptyDepends();
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

  return {
    context,
    stats,
    
    async start () { return await startPipeline(_pipeline, context, stats); },
    async close () { return await closePipeline(_pipeline, context, stats); }
  };
};
export default createPipeline;
