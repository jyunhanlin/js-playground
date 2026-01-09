// Memory Limit Exceeded
var minOperations = function (x, A) {
  const sum = A.reduce((a, b) => a + b);
  if (sum % x === 0) return 0;

  const n = A.length;
  const maxSum = sum + n;
  const dp = new Array(n + 1).fill().map(() => new Array(maxSum + 1).fill(Infinity));

  for (let i = 0; i < n; i += 1) {
    const a = A[i];
    for (let j = 0; j < maxSum; j += 1) {
      // j + a
      if (j + a <= maxSum) dp[i + 1][j + a] = Math.min(dp[i + 1][j + a], dp[i][j]);

      // j + a + 1
      if (j + a + 1 <= maxSum) {
        let cur = dp[i][j] !== Infinity ? dp[i][j] : 0;
        dp[i + 1][j + a + 1] = Math.min(dp[i + 1][j + a + 1], cur + 1);
      }

      // j - a
      if (j - a >= 0) {
        let cur = dp[i][j] !== Infinity ? dp[i][j] : 0;
        dp[i + 1][j - a] = Math.min(dp[i + 1][j - a], cur + 1);
      }
    }
  }

  let min = n;

  for (let i = 0; i < maxSum; i += 1) {
    if (dp[n][i] !== Infinity && i % x === 0) min = Math.min(min, dp[n][i]);
  }

  return min;
};
