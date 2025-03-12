/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  const res = new Array(n).fill().map(() => new Array(m));

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      res[j][i] = matrix[i][j];
    }
  }

  return res;
};
