/**
 * @param {number[]} rewardValues
 * @return {number}
 */
var maxTotalReward = function (rewardValues) {
  const n = rewardValues.length;
  rewardValues.sort((a, b) => a - b);
  const maxVal = rewardValues[n - 1];

  const dp = Array.from({ length: n + 1 }, () => Array(maxVal * 2).fill(0));
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    const curVal = rewardValues[i - 1];
    for (let x = 0; x < maxVal * 2; x++) {
      if (x >= curVal && curVal > x - curVal) {
        const add = dp[i - 1][x - curVal];
        const notAdd = dp[i - 1][x];
        dp[i][x] = add || notAdd;
      } else {
        dp[i][x] = dp[i - 1][x];
      }
    }
  }

  for (let j = maxVal * 2 - 1; j >= 0; j--) {
    if (dp[n][j]) {
      return j;
    }
  }
  return 0;
};
