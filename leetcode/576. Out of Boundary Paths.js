/**
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @return {number}
 */
var findPaths = function (m, n, maxMove, startRow, startColumn) {
  const MOD = 10 ** 9 + 7;
  const dp = new Array(m)
    .fill(null)
    .map(() => new Array(n).fill(null).map(() => new Array(maxMove + 1).fill(-1)));

  const helper = (r, c, move) => {
    if (move < 0) return 0;
    if (r < 0 || r >= m || c < 0 || c >= n) return 1;
    if (dp[r][c][move] !== -1) return dp[r][c][move];

    dp[r][c][move] =
      (helper(r + 1, c, move - 1) +
        helper(r, c + 1, move - 1) +
        helper(r - 1, c, move - 1) +
        helper(r, c - 1, move - 1)) %
      MOD;

    return dp[r][c][move];
  };

  return helper(startRow, startColumn, maxMove);
};
