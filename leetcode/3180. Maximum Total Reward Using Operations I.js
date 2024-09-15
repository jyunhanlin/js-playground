// Time Limit Exceeded
/**
 * @param {number[]} rewardValues
 * @return {number}
 */
var maxTotalReward = function (rewardValues) {
  rewardValues.sort((a, b) => a - b);
  const n = rewardValues.length;

  const dp = new Array(n).fill().map((_, index) => [rewardValues[index]]);

  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      for (let k = 0; k < dp[j].length; k += 1) {
        if (rewardValues[i] > dp[j][k]) dp[i].push(dp[j][k] + rewardValues[i]);
      }
    }
  }

  return Math.max(...dp[n - 1]);
};
