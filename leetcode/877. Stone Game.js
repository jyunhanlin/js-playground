/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
  const n = piles.length;
  const dp = new Array(n).fill(0).map((el) => new Array(n).fill(-Infinity));
  for (let i = 0; i < n; i++) {
    for (let j = i; j >= 0; j--) {
      if (j === i) {
        dp[i][i] = piles[i];
      } else {
        dp[j][i] = Math.max(piles[j] - dp[j + 1][i], piles[i] - dp[j][i - 1]);
      }
    }
  }
  return dp[0][n - 1] > 0;
};
