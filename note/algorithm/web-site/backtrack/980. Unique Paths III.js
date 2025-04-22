/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function (grid) {
  let res = 0;
  let visitedCount = 0;
  let totalCount = 0;

  const m = grid.length;
  const n = grid[0].length;
  const visited = new Array(m).fill().map(() => new Array(n).fill(false));

  let startI = 0;
  let startJ = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        startI = i;
        startJ = j;
      }
      if (grid[i][j] === 1 || grid[i][j] === 0) {
        totalCount++;
      }
    }
  }

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const backtrack = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n) return;
    if (grid[i][j] === -1) return;
    if (visited[i][j]) return;

    if (grid[i][j] === 2) {
      if (visitedCount === totalCount) res += 1;
      return;
    }

    visited[i][j] = true;
    visitedCount++;

    for (const dir of dirs) {
      backtrack(i + dir[0], j + dir[1]);
    }

    visited[i][j] = false;
    visitedCount--;
  };

  backtrack(startI, startJ);

  return res;
};
