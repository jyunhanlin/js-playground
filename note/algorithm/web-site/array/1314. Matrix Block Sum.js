/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
var matrixBlockSum = function (mat, k) {
  const m = mat.length;
  const n = mat[0].length;
  const res = new Array(m).fill().map(() => new Array(n).fill(0));

  const numMatrix = new NumMatrix(mat);

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const x1 = Math.max(i - k, 0);
      const y1 = Math.max(j - k, 0);
      const x2 = Math.min(i + k, m - 1);
      const y2 = Math.min(j + k, n - 1);
      res[i][j] = numMatrix.sumRegion(x1, y1, x2, y2);
    }
  }
  return res;
};

var NumMatrix = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  this.preSum = new Array(m + 1).fill().map(() => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      this.preSum[i][j] =
        this.preSum[i - 1][j] +
        this.preSum[i][j - 1] +
        matrix[i - 1][j - 1] -
        this.preSum[i - 1][j - 1];
    }
  }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return (
    this.preSum[row2 + 1][col2 + 1] -
    this.preSum[row1][col2 + 1] -
    this.preSum[row2 + 1][col1] +
    this.preSum[row1][col1]
  );
};
