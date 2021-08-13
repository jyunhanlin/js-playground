/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let maxProfit = 0;

  let minPrice = prices[0];

  for (let i = 0; i < prices.length; i += 1) {
    const price = prices[i];

    minPrice = Math.min(minPrice, price);

    maxProfit = Math.max(maxProfit, price - minPrice);
  }

  return maxProfit;
};
