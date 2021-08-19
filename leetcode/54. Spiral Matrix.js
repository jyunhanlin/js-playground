/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const result = [];
  let left = 0,
    right = matrix[0].length - 1,
    top = 0,
    bottom = matrix.length - 1;

  let dir = 'right';

  while (left <= right && top <= bottom) {
    if (dir === 'right') {
      for (let i = left; i <= right; i += 1) {
        result.push(matrix[top][i]);
      }

      top++;
      dir = 'down';
    } else if (dir === 'down') {
      for (let i = top; i <= bottom; i += 1) {
        result.push(matrix[i][right]);
      }

      right--;
      dir = 'left';
    } else if (dir === 'left') {
      for (let i = right; i >= left; i -= 1) {
        result.push(matrix[bottom][i]);
      }

      bottom--;

      dir = 'up';
    } else if (dir === 'up') {
      for (let i = bottom; i >= top; i -= 1) {
        result.push(matrix[i][left]);
      }

      left++;
      dir = 'right';
    }
  }

  return result;
};
