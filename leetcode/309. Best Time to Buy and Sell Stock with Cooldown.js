/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let curHold = -Infinity;
  let curNotHold = 0;
  let curCoolDown = 0;

  for (let i = 0; i < prices.length; i += 1) {
    let preHold = curHold;
    let preNotHold = curNotHold;
    let preCoolDown = curCoolDown;

    curCoolDown = Math.max(preCoolDown, preNotHold);

    curHold = Math.max(preHold, preCoolDown - prices[i]);
    curNotHold = Math.max(preNotHold, preHold + prices[i]);
  }

  return Math.max(curNotHold, curCoolDown);
};
