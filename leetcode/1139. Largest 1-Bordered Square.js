/**
 * @param {number[][]} grid
 * @return {number}
 */

// refer to: https://leetcode.com/problems/largest-1-bordered-square/solutions/345265/c-beats-100-both-time-and-memory-concise-with-algorithm-and-image/
var largest1BorderedSquare = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const hor = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const ver = new Array(m).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        hor[i][j] = j > 0 ? hor[i][j - 1] + 1 : 1;
        ver[i][j] = i > 0 ? ver[i - 1][j] + 1 : 1;
      }
    }
  }

  let max = 0;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const size = Math.min(ver[i][j], hor[i][j]);
      for (let k = size; k > 0; k -= 1) {
        if (ver[i][j - k + 1] >= k && hor[i - k + 1][j] >= k) {
          max = Math.max(max, k);
          break;
        }
      }
    }
  }
  return max * max;
};
