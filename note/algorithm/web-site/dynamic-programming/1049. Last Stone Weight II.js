/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
  const sum = stones.reduce((a, b) => a + b);
  const halfSum = Math.floor(sum / 2);

  const dp = new Array(stones.length + 1).fill().map(() => new Array(halfSum + 1).fill(0));

  for (let i = 1; i <= stones.length; i += 1) {
    const stone = stones[i - 1];
    for (j = 0; j <= halfSum; j += 1) {
      if (j >= stone) {
        dp[i][j] = Math.max(dp[i - 1][j - stone] + stone, dp[i - 1][j]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return sum - dp[stones.length][halfSum] * 2;
};
