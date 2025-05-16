/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  if (!matrix.length) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  let max = 0;
  for (let r = 1; r <= m; r++) {
    for (let c = 1; c <= n; c++) {
      if (matrix[r - 1][c - 1] !== '0') {
        dp[r][c] = Math.min(dp[r][c - 1], dp[r - 1][c], dp[r - 1][c - 1]) + 1;
        max = Math.max(dp[r][c], max);
      }
    }
  }
  return max * max;
};
