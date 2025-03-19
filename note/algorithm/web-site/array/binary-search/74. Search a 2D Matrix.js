/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  let start = 0;
  let end = m * n - 1;
  while (start <= end) {
    const mid = Math.floor(start + (end - start) / 2);
    const i = Math.floor(mid / n);
    const j = mid % n;
    const value = matrix[i][j];

    if (value === target) return true;
    else if (value < target) start = mid + 1;
    else if (value > target) end = mid - 1;
  }

  return false;
};
