/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  const dp = [];
  return Math.min(minCost(n - 1, cost, dp), minCost(n - 2, cost, dp));
};

const minCost = (n, cost, dp) => {
  if (n === 0) return cost[0];
  if (n === 1) return cost[1];

  if (dp[n]) return dp[n];

  dp[n] = cost[n] + Math.min(minCost(n - 1, cost, dp), minCost(n - 2, cost, dp));
  return dp[n];
};

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const dp = [cost[0], cost[1]];

  for (let i = 2; i < cost.length; i += 1) {
    dp[i] = Math.min(cost[i] + dp[i - 2], cost[i] + dp[i - 1]);
  }

  return Math.min(dp[cost.length - 1], dp[cost.length - 2]);
};
