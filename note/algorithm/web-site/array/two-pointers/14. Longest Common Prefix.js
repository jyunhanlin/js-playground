/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  const m = strs.length;
  const n = strs[0].length;

  let res = '';

  for (let j = 0; j < n; j += 1) {
    for (let i = 1; i < m; i += 1) {
      const cur = strs[i];
      const prev = strs[i - 1];

      if (cur[j] !== prev[j]) return strs[i].substring(0, j);
    }
  }

  return strs[0];
};
