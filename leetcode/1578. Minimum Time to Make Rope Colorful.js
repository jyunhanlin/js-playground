/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
  let res = 0,
    maxCost = 0,
    sumCost = 0,
    n = colors.length;

  for (let i = 0; i < n; i += 1) {
    if (i > 0 && colors[i] !== colors[i - 1]) {
      res += sumCost - maxCost;
      sumCost = maxCost = 0;
    }
    sumCost += neededTime[i];
    maxCost = Math.max(maxCost, neededTime[i]);
  }
  res += sumCost - maxCost;
  return res;
};

/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
  let res = 0,
    maxCost = 0,
    n = colors.length;
  for (let i = 0; i < n; ++i) {
    if (i > 0 && colors[i] !== colors[i - 1]) maxCost = 0;
    res += Math.min(maxCost, neededTime[i]);
    maxCost = Math.max(maxCost, neededTime[i]);
  }
  return res;
};
