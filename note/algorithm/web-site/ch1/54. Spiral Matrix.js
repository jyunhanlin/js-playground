/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  let upper_bound = 0;
  let lower_bound = m - 1;
  let left_bound = 0;
  let right_bound = n - 1;
  const res = [];

  while (res.length < m * n) {
    if (upper_bound <= lower_bound) {
      for (var j = left_bound; j <= right_bound; j++) {
        res.push(matrix[upper_bound][j]);
      }
      upper_bound++;
    }

    if (left_bound <= right_bound) {
      for (var i = upper_bound; i <= lower_bound; i++) {
        res.push(matrix[i][right_bound]);
      }

      right_bound--;
    }

    if (upper_bound <= lower_bound) {
      for (var j = right_bound; j >= left_bound; j--) {
        res.push(matrix[lower_bound][j]);
      }
      lower_bound--;
    }

    if (left_bound <= right_bound) {
      for (var i = lower_bound; i >= upper_bound; i--) {
        res.push(matrix[i][left_bound]);
      }
      left_bound++;
    }
  }

  return res;
};
