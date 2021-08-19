/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const oriZeroPairs = [];

  for (let m = 0; m < matrix.length; m += 1) {
    for (let n = 0; n < matrix[0].length; n += 1) {
      if (matrix[m][n] === 0) {
        oriZeroPairs.push([m, n]);
      }
    }
  }

  for (let pair of oriZeroPairs) {
    const [m, n] = pair;

    // vertical
    for (let i = 0; i < matrix.length; i += 1) {
      if (matrix[i][n] !== 0) matrix[i][n] = 0;
    }

    // horizontal
    for (let i = 0; i < matrix[0].length; i += 1) {
      if (matrix[m][i] !== 0) matrix[m][i] = 0;
    }
  }
};
