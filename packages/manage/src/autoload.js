import fs from 'fs';
import { resolve } from 'path';

/**
 * Auto load plugin from current package.json.
 * Plugins were loaded from dependencies with prefix 'rugo'.
 * If the rugo-* packages does not have rugo-\*\/plugin file, skipped.
 *
 * @returns {Pipeline} pipeline of plugins.
 */
const autoload = async () => {
  const { dependencies = [] } = JSON.parse(fs.readFileSync(resolve('package.json')).toString());
  const pipeline = [];

  for (const name in dependencies) {
    const pluginPath = resolve(dependencies[name], 'plugin.js');
    if (!fs.existsSync(pluginPath)) { continue; }

    pipeline.push((await import(pluginPath)).default);
  }

  return pipeline;
};
export default autoload;
