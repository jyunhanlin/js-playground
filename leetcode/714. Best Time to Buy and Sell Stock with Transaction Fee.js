/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  let curHold = -Infinity;
  let curNotHold = 0;

  for (let i = 0; i < prices.length; i += 1) {
    const preCurHold = curHold;
    const preCurNotHold = curNotHold;

    curHold = Math.max(preHold, preCurNotHold - prices[i]);
    curNotHold = Math.max(preCurNotHold, preHold + prices[i] - fee);
  }

  return curNotHold;
};
