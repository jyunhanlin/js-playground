/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
  const m = dungeon.length;
  const n = dungeon[0].length;

  const memo = new Array(m).fill().map(() => new Array(n).fill(-1));

  const dp = (i, j) => {
    if (i === m - 1 && j === n - 1) return dungeon[i][j] >= 0 ? 1 : -dungeon[i][j] + 1;
    if (i === m || j === n) return Infinity;
    if (memo[i][j] !== -1) return memo[i][j];

    const health = Math.min(dp(i + 1, j), dp(i, j + 1)) - dungeon[i][j];

    memo[i][j] = health <= 0 ? 1 : health;

    return memo[i][j];
  };

  return dp(0, 0);
};
