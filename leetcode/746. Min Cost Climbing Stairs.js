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
