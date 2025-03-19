/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  let i = 0;
  let j = n - 1;

  while (i < m && j >= 0) {
    if (matrix[i][j] === target) return true;
    if (matrix[i][j] < target) i++;
    else j--;
  }

  return false;
};
