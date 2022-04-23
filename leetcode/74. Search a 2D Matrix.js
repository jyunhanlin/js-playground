/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let start = 0,
    end = matrix.length;

  while (start < end) {
    const mid = Math.floor(start + (end - start) / 2);
    if (matrix[mid][0] === target) return true;

    if (matrix[mid][0] > target) end = mid;
    else start = mid + 1;
  }

  let targetM;

  if (start - 1 < 0) targetM = 0;
  else if (start - 1 >= matrix.length) targetM = matrix.length - 1;
  else targetM = start - 1;

  // const targetM = start - 1 ? start - 1 : 0;

  (start = 0), (end = matrix[targetM].length - 1);

  while (start <= end) {
    const mid = Math.floor(start + (end - start) / 2);

    if (matrix[targetM][mid] === target) return true;

    if (matrix[targetM][mid] > target) end = mid - 1;
    else start = mid + 1;
  }

  return false;
};
