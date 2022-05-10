# Rugo Core

_Core packages for the Rugo platform as common_

## Concept

### Packages

- Each package is independence.
- You must create a fake package if current want to test.

### Prefix

- `__name`: Using for system configuration, can be hidden in main purpose. Study cases: model schema (`__name`, `__type`).
- `:name` or `_name`: Placeholder, variable, matching. Study cases: api path (`/:id`), file system routing (`_id`).
- `.name.b.c` or `/name/b/c`: Signature for object or path. Study cases: access object in depth (`.a.b.c`), file path (`/a/b/c`).


## Documentations

- [Rugo Api](./packages/api/README.md)
- [Rugo Common](./packages/common/README.md)
- [Rugo Driver](./packages/driver/README.md)
- [Rugo Manage](./packages/manage/README.md)
- [Rugo Model](./packages/model/README.md)
- [Rugo Server](./packages/server/README.md)

## License

MIT