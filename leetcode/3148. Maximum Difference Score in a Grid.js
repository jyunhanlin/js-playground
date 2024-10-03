/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxScore = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dp = new Array(m).fill().map(() => new Array(n).fill());

  let max = -Infinity;

  const helper = (r, c) => {
    if (r >= m || c >= n) return -Infinity;

    if (dp[r][c]) return dp[r][c];

    const currentMax = Math.max(helper(r + 1, c), helper(r, c + 1));
    max = Math.max(max, currentMax - grid[r][c]);

    dp[r][c] = Math.max(currentMax, grid[r][c]);

    return dp[r][c];
  };

  helper(0, 0);

  return max;
};
