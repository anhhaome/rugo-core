# Rugo View

Server side rendering.

## File System Routing

**Direct routes**

- `/` -> `/index.ejs`
- `/blog` -> `/blog.ejs`.

**Named routes** (Prefix with underscore)

- `/foo` -> `/_name.ejs`
- `/foo` -> `/_name/index.ejs`

**Skipped routes** (Prefix with dot, or double underscore)

- `/__bar.ejs` or more pretty with `/__bar__.ejs`.
- `/.sth.ejs` (Avoid that because it will be a hidden file).


