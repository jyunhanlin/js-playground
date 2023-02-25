/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function (n) {
  let res = 0;

  for (let i = 0; i < 10 ** n; i += 1) {
    if (isWithUniqueDigits(i)) res += 1;
  }

  return res;
};

const isWithUniqueDigits = (n) => {
  const splitN = `${n}`.split('');
  return new Set(splitN).size === splitN.length;
};

var countNumbersWithUniqueDigits = function (n) {
  if (n === 0) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 10;
  dp[2] = 81;

  for (let i = 3; i <= n; i += 1) {
    dp[i] = dp[i - 1] * (10 - i + 1);
  }

  let res = 0;
  for (let i = 0; i <= n; i += 1) {
    res += dp[i];
  }

  return res;
};
