/**
 * Concept:
 * 1. 計算出amount之前數量的最小值
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const amountArr = new Array(amount + 1).fill(Infinity);

  amountArr[0] = 0;

  for (let i = 1; i < amountArr.length; i += 1) {
    for (let j = 0; j < coins.length; j += 1) {
      const coin = coins[j];
      if (coin <= i) {
        amountArr[i] = Math.min(amountArr[i - coin] + 1, amountArr[i]);
      }
    }
  }

  const times = amountArr[amountArr.length - 1];

  return times === Infinity ? -1 : times;
};
