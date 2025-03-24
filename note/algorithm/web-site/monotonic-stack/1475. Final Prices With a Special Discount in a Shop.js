/**
 * @param {number[]} prices
 * @return {number[]}
 */
var finalPrices = function (prices) {
  const n = prices.length;
  const stack = [];
  const res = [];

  for (let i = n - 1; i >= 0; i -= 1) {
    while (stack.length && stack[stack.length - 1] > prices[i]) {
      stack.pop();
    }

    res[i] = stack.length ? prices[i] - stack[stack.length - 1] : prices[i];
    stack.push(prices[i]);
  }

  return res;
};
