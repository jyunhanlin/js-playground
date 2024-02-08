/**
 * @param {number[]} arr
 * @return {number}
 */
var numFactoredBinaryTrees = function (arr) {
  const mod = 1e9 + 7;

  arr.sort((a, b) => a - b);

  const dp = {};

  for (let i = 0; i < arr.length; i += 1) {
    const root = arr[i];
    dp[root] = 1;

    for (let j = 0; j < arr.length; j += 1) {
      const node = arr[j];
      if (node >= root) break;

      if (root % node === 0 && dp[root / node]) dp[root] += dp[node] * dp[root / node];
    }
  }

  return Object.values(dp).reduce((a, b) => a + b, 0) % mod;
};
