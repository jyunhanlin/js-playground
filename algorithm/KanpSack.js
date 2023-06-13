/**
 *
 * @param {number} maxWeight
 * @param {number[]} weights
 * @param {number[]} values
 * @returns {number}
 */
function KanpSack(maxWeight, weights, values) {
  console.log(maxWeight, weights, values);
  let n = values.length;
  let dp = Array(values.length + 1)
    .fill()
    .map(() => Array(maxWeight + 1).fill(0));
  console.log(dp);

  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= maxWeight; j += 1) {
      if (j < weights[i - 1]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j - weights[i - 1]] + values[i - 1], dp[i - 1][j]);
      }
    }
  }

  return dp[n][maxWeight];
}
