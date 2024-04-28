/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxMoves = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = {};

  const helper = (r, c, prev) => {
    const key = `${r}__${c}`;
    if (dp[key]) return dp[key];

    if (r < 0 || r >= m || c >= n || grid[r][c] <= prev) return 0;

    const count =
      Math.max(
        helper(r + 1, c + 1, grid[r][c]),
        helper(r - 1, c + 1, grid[r][c]),
        helper(r, c + 1, grid[r][c])
      ) + 1;

    dp[key] = count;

    return count;
  };

  let ans = 0;
  for (let i = 0; i <= m; i += 1) {
    ans = Math.max(ans, helper(i, 0, -Infinity) - 1);
  }

  return ans;
};
