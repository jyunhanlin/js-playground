/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function (n) {
  let res = 0;
  let d = 2;
  while (n > 1) {
    while (n % d === 0) {
      res += d;
      n /= d;
    }
    d++;
  }

  return res;
};

var minSteps = function (n) {
  if (n === 1) return 0;

  const dp = new Array(n + 1).fill(0);
  dp[2] = 2;

  for (let i = 3; i <= n; i += 1) {
    dp[i] = i;
    for (let j = 1; j < i; j += 1) {
      //  copy from anywhere when the number of missing 'A' (i-j)
      //  is dividable by the number of existing 'A' (j)
      //  the bottom line is when j == 1
      //  1 copy + (i-j)/j paste
      if ((i - j) % j === 0) {
        dp[i] = Math.min(dp[i], dp[j] + 1 + (i - j) / j);
      }
    }
  }

  return dp[n];
};
