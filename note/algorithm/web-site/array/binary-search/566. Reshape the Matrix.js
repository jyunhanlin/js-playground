/**
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function (mat, r, c) {
  const m = mat.length;
  const n = mat[0].length;
  if (r * c !== m * n) return mat;

  const res = new Array(r).fill().map(() => new Array(c).fill(0));

  for (let i = 0; i < m * n; i += 1) {
    res[Math.floor(i / c)][i % c] = mat[Math.floor(i / n)][i % n];
  }

  return res;
};
