# Rugo Manage

Manage platform tools.

## Concept

### Pipeline & Plugin

- `context` the main registry of the platform.
- Each key of `context` called `register`. Ex: `driver` register, `model` register.

```js
const context = {
  driver: {},
  model: {}
}
```

- Each register can be create (initial), update (wrapped) or using it, called interact.

```js
context.driver = {}; // init
context.driver = wrap(context.driver); // wrap
```

- For interact with register, using `plugin`.

```js
const plugin = {
  async start(context){ 
    context.driver = {};
    return context;
  },
  async close(context){ return context; }
}
```

- Sometime, plugin use register that was not created. You can put register you need into `depends`.

```js
const plugin = {
  depends: ['driver']
}
```

- For enable multuple plugins, using the reducer.

```js
const pipeline = [
  DriverPlugin,
  ModelPlugin
]
```

- Reducer will be call empty `depends` plugin first. After that, exclude register created from `depends` and call the next empty.
- Until cannot see any empty plugin, alert the platform start.
- When you want to close the platform, the reducer will call all close method of plugins. After done, notify and exit.
- If some plugins have same depends, using `priority` to specific order to run.

```js
const plugin = {
  priority: 10
}
```

- Provide `name` to identity plugin.

```js
const plugin = {
  name: 'driver'
}
```

## Usage

### Pipeline

```js
const pp = createPipeline([ pluginA, pluginB, pluginC ]);
const context = await pp.start();
const context2 = await pp.close();
/* context === context2 */
```

### Runner

```js
dotenv.config();

const platform = await createRunner();
await platform.close();
```

### Command

```bash
npm run manage -- start
```

## API

[Visit API documentation.](./docs/API.md)

## License

MIT