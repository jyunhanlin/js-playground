/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  if (obstacleGrid[0][0] === 1) return 0;

  const obstacle = obstacleGrid[0][0] === 0 ? 1 : 0;
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (obstacleGrid[i][j] === obstacle) obstacleGrid[i][j] = 'o';
      else obstacleGrid[i][j] = 0;
    }
  }

  for (let i = 0; i < m; i += 1) {
    if (obstacleGrid[i][0] !== 'o') obstacleGrid[i][0] = 1;
    else break;
  }

  for (let i = 0; i < n; i += 1) {
    if (obstacleGrid[0][i] !== 'o') obstacleGrid[0][i] = 1;
    else break;
  }

  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      if (obstacleGrid[i][j] === 'o') continue;

      let top = obstacleGrid[i - 1][j] === 'o' ? 0 : obstacleGrid[i - 1][j];
      let left = obstacleGrid[i][j - 1] === 'o' ? 0 : obstacleGrid[i][j - 1];

      obstacleGrid[i][j] = top + left;
    }
  }

  return obstacleGrid[m - 1][n - 1] === 'o' ? 0 : obstacleGrid[m - 1][n - 1];
};
