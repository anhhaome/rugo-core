import colors from 'colors';

import autoload from './autoload.js';
import createPipeline from './pipeline.js';

const createRunner = async () => {
  const pipeline = await autoload();
  const stats = {};
  const pp = createPipeline(pipeline, {}, stats);

  await pp.start();

  console.log(colors.yellow('[manage]'));
  console.log(colors.green(`- Started: ${stats.starts.join(', ')}${stats.starts.length ? ' ' : ''}(${stats.starts.length}/${pipeline.length})`));
  console.log(colors.red(`- Unstarted: ${stats.doNotStarts.join(', ')}${stats.doNotStarts.length ? ' ' : ''}(${stats.doNotStarts.length}/${pipeline.length})`));
  console.log(colors.yellow('[/manage]'));

  return pp;
};
export default createRunner;
