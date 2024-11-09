/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var isPossibleToCutPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const helper = (i, j) => {
    if (i >= m || j >= n) return false;
    if (grid[i][j] === 0) return false;
    if (i === m - 1 && j === n - 1) return true;
    if (i > 0 || j > 0) grid[i][j] = 0;
    if (helper(i, j + 1)) return true;
    if (helper(i + 1, j)) return true;
    return false;
  };

  if (!helper(0, 0)) return true;

  return !helper(0, 0);
};
