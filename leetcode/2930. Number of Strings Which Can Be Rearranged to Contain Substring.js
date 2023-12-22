/**
 * @param {number} n
 * @return {number}
 */
var stringCount = function (n) {
  const mod = 1e9 + 7;

  const LEET = 0b1111;
  const L = 0b1000;
  const FE = 0b0100;
  const SE = 0b0010;
  const T = 0b0001;

  const dp = new Array(n).fill(0).map(() => new Array(16).fill(-1));

  const helper = (i, mask) => {
    if (i === n) return Number(mask === LEET);

    if (dp[i][mask] !== -1) return dp[i][mask];

    let ways = helper(i + 1, mask | L);

    if (mask & FE) ways += helper(i + 1, mask | SE);
    else ways += helper(i + 1, mask | FE);

    ways += helper(i + 1, mask | T);

    ways += 23 * helper(i + 1, mask);

    dp[i][mask] = ways % mod;
    return dp[i][mask];
  };

  return helper(0, 0);
};
