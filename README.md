# removeOrphans

A vanilla Javascript utility that prevents words from appearing on their own new line (known as orphans or widows.) It's light, smart, and doesn't require any external libraries.
- It's light: Just 553 bytes minified. All it does it put a non-breaking space, `&nbsp;`, between the last words in an element. Super simple.
- It's smart: It notices HTML entites and skips them, preventing disasters like `<strong&nbsp;class=...>`.
- It's vanilla: No external dependencies. Just plain old Javascript written to work in all major browsers.

## Example

Without `removeOrphans`:

```
I'm an element whose text wraps around to a new
line
```

With `removeOrphans`:

```
I'm an element whose text wraps around to a
new line
```

## How to use it

Reference `removeOrphans.js` in your application somehow, e.g.

`<script src="path/to/removeOrphans.js" type="text/javascript"></script>`

The `window` now contains `removeOrphans(CSS selector [, parameters])`

Calling `removeOrphans('h1, h2')` will add a non-breaking space between the last two words in top- and second-level headings, preventing those elements from having orphans.
`removeOrphans` also takes a second parameter, which can define these properties:
- `allowedLength`: If the final word in an element is beyond this length then that element will be skipped. Useful if the last word would look okay on its own line.
- `siblings`: By default, the orphan will have one sibling on the new line. If more than one is wanted, set sibling to control how many words should accompany the orphan on the new line.

Define these values by passing in an object, e.g.

`removeOrphans('h1, h2, h3', { allowedLength: 10, siblings: 2 })`

This call will remove orphaned words on top-, second-, and third-level headings, skipping those that end in words with 10 or more characters (punctuation included), ensuring that at least three words end on the same line (due to requiring 2 siblings.)

```
I'm a heading element whose text wraps around to
a new line
```

## Caution!

This utility works by changing the `innerHTML` of elements, so call `removeOrphans` before binding events to elements.

## Providing Different Options on Elements

If you need to provide different options depending on the element, call removeOrphans as many times as you need:

```
removeOrphans('h1, h2');
removeOrphans('p', { siblings: 2 });
removeOrphans('.another-class, #another-id', { allowedLength: 12 });
```

## Browser Compatibility
Chrome, Firefox, Safari, Opera, Edge, and IE 8-11.