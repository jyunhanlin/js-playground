/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const matrix = new Array(n).fill().map(() => new Array(n).fill(0));

  let upper_bound = 0;
  let lower_bound = n - 1;
  let left_bound = 0;
  let right_bound = n - 1;
  let num = 1;

  while (num <= n * n) {
    if (upper_bound <= lower_bound) {
      for (var j = left_bound; j <= right_bound; j++) {
        matrix[upper_bound][j] = num++;
      }
      upper_bound++;
    }

    if (left_bound <= right_bound) {
      for (var i = upper_bound; i <= lower_bound; i++) {
        matrix[i][right_bound] = num++;
      }

      right_bound--;
    }

    if (upper_bound <= lower_bound) {
      for (var j = right_bound; j >= left_bound; j--) {
        matrix[lower_bound][j] = num++;
      }
      lower_bound--;
    }

    if (left_bound <= right_bound) {
      for (var i = lower_bound; i >= upper_bound; i--) {
        matrix[i][left_bound] = num++;
      }
      left_bound++;
    }
  }

  return matrix;
};
