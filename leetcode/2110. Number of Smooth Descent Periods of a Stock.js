/**
 * @param {number[]} prices
 * @return {number}
 */
var getDescentPeriods = function (prices) {
  const arr = [];

  let pre = 1;

  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i - 1] - prices[i] === 1) pre += 1;
    else {
      arr.push(pre);
      pre = 1;
    }
  }

  arr.push(pre);

  let res = 0;
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 1; j <= arr[i]; j += 1) {
      res += j;
    }
  }

  return res;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var getDescentPeriods = function (prices) {
  const dp = new Array(prices.length).fill(1);
  let res = dp[0];

  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i - 1] - prices[i] === 1) dp[i] = dp[i - 1] + 1;
    else {
      dp[i] = 1;
    }

    res += dp[i];
  }

  return res;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var getDescentPeriods = function (prices) {
  let pre = 1;
  let res = 1;

  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i - 1] - prices[i] === 1) pre += 1;
    else {
      pre = 1;
    }
    res += pre;
  }

  return res;
};
