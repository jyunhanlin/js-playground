/**
 * @param {number} n
 * @return {number}
 */
var getMaximumGenerated = function (n) {
  const result = Array(n + 1).fill(undefined);
  result[0] = 0;
  result[1] = 1;

  for (let i = 2; i <= n; i += 1) {
    if (i % 2) {
      const idx = Math.floor(i / 2);
      result[i] = result[idx] + result[idx + 1];
    } else {
      result[i] = result[i / 2];
    }
  }

  return n === 0 ? 0 : Math.max(...result);
};
