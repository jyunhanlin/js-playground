# RegEx

## Lazy and Greed

```js
const nonLazy = /<.+>/;

const lazy = /<.+?>/;
```

## Group

```js
const group = /(\d{4})-(\d{7})/;

// (?:regex) won't be captured
const nonCaptureGroup = /(\d{4})-(?:\d{2})-(\d{2})/;
```

## Flash Back

```js
const noFlashBack = /<[\w]+>.*<\/[\w]+>/;

const flashBack = /<[\w]+>.*<\/\1>/;
```

## Assertion

```js
// positive lookahead
const plaRegex = /positive(?=lookahead)/;

// negative lookahead
const nlaRegex = /negative(?!lookahead)/;

// positive lookbehind
const plbRegex = /(?<=positive)lookbehind/;

// negative lookbehind
const nlbRegex = /(?<!negative)lookbehind/;
```

```js
// password

const passwordRegex = /(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z]).{8,}/;
```
