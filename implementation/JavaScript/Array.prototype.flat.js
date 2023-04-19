// ref: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

const flat = (arr) =>
  arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flat(cur) : cur), []);

const flatMap = (arr, fn) =>
  arr
    .reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatMap(cur, (x) => x) : cur), [])
    .map(fn);
