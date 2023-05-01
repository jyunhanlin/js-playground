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

var minCost = function (colors, neededTime) {
  const sum = neededTime.reduce((a, b) => a + b, 0);

  let newSum = neededTime[0];
  let maxCost = neededTime[0];
  for (let i = 1; i < colors.length; i += 1) {
    if (colors[i - 1] === colors[i]) {
      newSum -= Math.max(maxCost, neededTime[i - 1]);
      newSum += Math.max(maxCost, neededTime[i - 1], neededTime[i]);
      maxCost = Math.max(maxCost, neededTime[i - 1], neededTime[i]);
    } else {
      maxCost = 0;
      newSum += neededTime[i];
    }
  }

  return sum - newSum;
};
