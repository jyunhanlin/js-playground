/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const dpPaths = new Array(m).fill(0).map(() => new Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    dpPaths[0][i] = 1;
  }

  for (let i = 0; i < m; i++) {
    dpPaths[i][0] = 1;
  }

  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      dpPaths[i][j] = dpPaths[i - 1][j] + dpPaths[i][j - 1];
    }
  }

  return dpPaths[m - 1][n - 1];
};
