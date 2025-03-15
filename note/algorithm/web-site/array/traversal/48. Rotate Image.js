/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;

  // Transpose the matrix
  for (let i = 0; i < n; i += 1) {
    for (let j = i; j < n; j += 1) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // reverse each row
  for (let i = 0; i < n; i += 1) {
    let j = 0;
    let k = matrix[i].length - 1;

    while (j < k) {
      [matrix[i][j], matrix[i][k]] = [matrix[i][k], matrix[i][j]];
      j += 1;
      k -= 1;
    }
  }
};
