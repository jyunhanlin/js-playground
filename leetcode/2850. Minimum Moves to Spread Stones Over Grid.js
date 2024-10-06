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
