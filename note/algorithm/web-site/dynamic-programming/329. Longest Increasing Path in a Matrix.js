/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  const memo = Array.from({ length: m }, () => Array(n).fill(0));

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const dp = (i, j) => {
    if (memo[i][j] !== 0) return memo[i][j];

    let res = 1;
    for (let dir of dirs) {
      let x = i + dir[0],
        y = j + dir[1];

      if (x < 0 || x >= m || y < 0 || y >= n) continue;

      if (matrix[x][y] > matrix[i][j]) {
        res = Math.max(res, dp(x, y) + 1);
      }
    }

    memo[i][j] = res;
    return res;
  };

  let max = 0;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      max = Math.max(max, dp(i, j));
    }
  }
  return max;
};
