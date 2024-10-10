/**
 * @param {string} s1
 * @param {string} s2
 * @param {number} x
 * @return {number}
 */
var minOperations = function (s1, s2, x) {
  const n = s1.length;
  const diff = [];

  for (let i = 0; i < n; i += 1) {
    if (s1[i] !== s2[i]) {
      diff.push(i);
    }
  }

  if (diff.length % 2 !== 0) return -1;
  if (diff.length === 0) return 0;

  const dp = new Array(n).fill().map(() => new Array(n).fill(-1));

  function helper(l, r) {
    if (l >= r) return 0;
    if (dp[l][r] !== -1) return dp[l][r];

    return (dp[l][r] = Math.min(
      Math.min(x, diff[l + 1] - diff[l]) + helper(l + 2, r),
      Math.min(x, diff[r] - diff[r - 1]) + helper(l, r - 2),
      Math.min(x, diff[r] - diff[l]) + helper(l + 1, r - 1)
    ));
  }

  return helper(0, diff.length - 1);
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumMoves = function (grid) {
  const extras = [];
  const zeros = [];

  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      if (grid[r][c] > 1) extras.push([r, c, grid[r][c]]);
      else if (grid[r][c] === 0) zeros.push([r, c]);
    }
  }

  const helper = (zeroIndex) => {
    if (zeroIndex >= zeros.length) return 0;

    let min = Infinity;
    let [r, c] = zeros[zeroIndex];

    for (let i = 0; i < extras.length; i += 1) {
      if (extras[i][2] > 1) {
        extras[i][2] -= 1;
        min = Math.min(
          min,
          Math.abs(extras[i][0] - r) + Math.abs(extras[i][1] - c) + helper(zeroIndex + 1)
        );
        extras[i][2] += 1;
      }
    }

    return min;
  };

  return helper(0);
};
