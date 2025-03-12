/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var diagonalSort = function (mat) {
  const m = mat.length;
  const n = mat[0].length;

  const diagonals = new Map();

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const key = j - i;
      if (!diagonals.has(key)) diagonals.set(key, []);
      diagonals.get(key).push(mat[i][j]);
    }
  }

  diagonals.forEach((diagonal) => diagonal.sort((a, b) => b - a));

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      mat[i][j] = diagonals.get(j - i).pop();
    }
  }

  return mat;
};
