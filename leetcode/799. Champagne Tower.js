/**
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
var champagneTower = function (poured, query_row, query_glass) {
  const dp = Array(query_row + 2)
    .fill()
    .map(() => Array(query_row + 2).fill(0));

  dp[0][0] = poured;

  for (let i = 0; i <= query_row; i++) {
    for (let j = 0; j <= i; j++) {
      if (dp[i][j] > 1) {
        const excess = dp[i][j] - 1;
        dp[i + 1][j] += excess / 2;
        dp[i + 1][j + 1] += excess / 2;
      }
    }
  }

  return dp[query_row][query_glass] <= 1 ? dp[query_row][query_glass] : 1;
};

/**
 * 0
 * 1 1
 * 2 2 2
 * 3 3 3 3
 */
