// time limit exceeded
/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, zero, one) {
  const result = new Set();

  const helper = (str) => {
    if (str.length > high) return;
    if (low <= str.length && str.length <= high && !result.has(str)) result.add(str);

    helper(str + new Array(zero).fill('0').join(''));
    helper(str + new Array(one).fill('1').join(''));
  };

  helper('');

  return result.size;
};

/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, zero, one) {
  const modulo = 1e9 + 7;
  let res = 0;
  const dp = Array(high + 1).fill(0);

  dp[0] = 1;

  for (let i = 1; i <= high; i++) {
    if (i - zero >= 0) {
      dp[i] = (dp[i] + dp[i - zero]) % modulo;
    }
    if (i - one >= 0) {
      dp[i] = (dp[i] + dp[i - one]) % modulo;
    }

    if (i >= low) {
      res = (res + dp[i]) % modulo;
    }
  }

  return res;
};
