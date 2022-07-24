/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
var matrixBlockSum = function (mat, k) {
  let dp = Array(mat.length + 1);
  // set first row value as 0
  dp[0] = Array(mat[0].length + 1).fill(0);

  // fill dp table with cumulative sum from (0,0) to (i,j)
  for (let i = 0; i < mat.length; i++) {
    dp[i + 1] = [0];
    for (let j = 0; j < mat[0].length; j++) {
      dp[i + 1][j + 1] = mat[i][j] + dp[i][j + 1] + dp[i + 1][j] - dp[i][j];
    }
  }
  // console.log({ dp })
  // find sum of r, c cells (cells in square) using DP table (inclusion/exclusion)
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      let r1 = Math.max(0, i - k),
        r2 = Math.min(mat.length - 1, i + k);
      let c1 = Math.max(0, j - k),
        c2 = Math.min(mat[0].length - 1, j + k);
      // r1++; r2++; c1++; c2++;
      mat[i][j] = dp[r2 + 1][c2 + 1] - dp[r1][c2 + 1] - dp[r2 + 1][c1] + dp[r1][c1];
    }
  }
  // used mat as result matrix
  return mat;
};
