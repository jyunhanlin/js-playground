// Time Limit Exceeded
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numberOfSets = function (n, k) {
  const mod = 1e9 + 7;
  const dp = new Array(n).fill().map(() => new Array(k + 1).fill(0));

  const helper = (start, curK) => {
    if (start === n || start + curK >= n) return 0;
    if (curK === 0) return 1;
    if (dp[start][curK]) return dp[start][curK];

    let count = helper(start + 1, curK);
    for (let i = start + 1; i < n; i += 1) {
      count += helper(i, curK - 1) % mod;
    }

    dp[start][curK] = count;
    return count % mod;
  };

  return helper(0, k);
};
