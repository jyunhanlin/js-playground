/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const memo = new Array(amount + 1).fill(Infinity);

  const dp = (amount) => {
    if (amount === 0) return 0;
    if (amount < 0) return -1;

    if (memo[amount] !== Infinity) return memo[amount];

    let res = Infinity;
    for (const coin of coins) {
      const subRes = dp(amount - coin);
      if (subRes === -1) continue;

      res = Math.min(res, subRes + 1);
    }

    memo[amount] = res === Infinity ? -1 : res;
    return memo[amount];
  };

  return dp(amount);
};
