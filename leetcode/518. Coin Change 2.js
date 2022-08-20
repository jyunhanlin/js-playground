/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const dp = new Array(amount + 1).fill(0);

  dp[0] = 1;

  for (const coin of coins) {
    for (let smallAmount = coin; smallAmount <= amount; smallAmount += 1) {
      dp[smallAmount] += dp[smallAmount - coin];
    }
  }

  return dp[amount];
};
