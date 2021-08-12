/**
 * Concept:
 *
 * Time Complexity O(8^k)
 */

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
var knightProbability = function (n, k, row, column) {
  const dp = new Array(k + 1)
    .fill(0)
    .map(() => new Array(n).fill(0).map(() => new Array(n).fill(undefined)));

  return recursion(n, k, row, column, dp);
};

const recursion = (n, k, row, column, dp) => {
  if (row < 0 || row > n - 1) return 0;
  if (column < 0 || column > n - 1) return 0;
  if (k === 0) return 1;

  if (dp[k][row][column] !== undefined) return dp[k][row][column];

  let res = 0;

  for (let i = 0; i < directions.length; i += 1) {
    const nextRow = row + directions[i][0];
    const nextColumn = column + directions[i][1];
    res += recursion(n, k - 1, nextRow, nextColumn, dp) / 8;
  }

  dp[k][row][column] = res;

  return res;
};

const directions = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];
