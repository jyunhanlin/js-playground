/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let [curHold, curNotHold] = [-Infinity, 0];

  for (const stockPrice of prices) {
    let [prevHold, prevNotHold] = [curHold, curNotHold];

    // either keep hold, or buy in stock today at stock price
    curHold = Math.max(prevHold, prevNotHold - stockPrice);

    // either keep not-hold, or sell out stock today at stock price
    curNotHold = Math.max(prevNotHold, prevHold + stockPrice);
  }

  // Max profit must come from notHold state finally.
  return curNotHold;
};

var maxProfit = function (prices) {
  var trade = function (day) {
    if (day == 0) {
      // Hold on day_0 = buy at day_#0 = -prices[0]
      // Not hold on day_0 = do nothing = 0
      return [-prices[0], 0];
    }

    let [prevHold, prevNotHold] = trade(day - 1);

    let curHold = Math.max(prevHold, prevNotHold - prices[day]);

    let curNotHold = Math.max(prevNotHold, prevHold + prices[day]);

    return [curHold, curNotHold];
  };

  [, finalNotHold] = trade(prices.length - 1);

  // Max profit must come from notHold state finally.
  return finalNotHold;
};
