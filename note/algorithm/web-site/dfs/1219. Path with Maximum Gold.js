/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let max = 0;

  const visited = new Set();
  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const dfs = (i, j, sum) => {
    if (i >= m || i < 0 || j >= n || j < 0) return;
    if (grid[i][j] === 0) return;
    const key = `${i}${j}`;
    if (visited.has(key)) return;

    sum += grid[i][j];
    max = Math.max(max, sum);

    visited.add(key);
    for (const dir of dirs) {
      dfs(i + dir[0], j + dir[1], sum);
    }
    visited.delete(key);
  };

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      dfs(i, j, 0);
    }
  }

  return max;
};
