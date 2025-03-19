/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const parts = path.split('/');

  const res = [];

  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') {
      res.pop();
      continue;
    }

    res.push(part);
  }

  return '/' + res.join('/');
};
