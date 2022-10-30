/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
  const n = piles.length;
  const dp = new Array(n).fill().map(() => new Array(n).fill(-Infinity));
  for (let i = 0; i < n; i++) {
    for (let j = i; j >= 0; j--) {
      if (j === i) {
        dp[i][i] = piles[i];
      } else {
        dp[j][i] = Math.max(piles[j] - dp[j + 1][i], piles[i] - dp[j][i - 1]);
      }
    }
  }
  return dp[0][n - 1] > 0;
};

/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
  const dp = new Array(piles.length).fill().map(() => new Array(piles.length).fill(0));

  const helper = (left, right, isAlice) => {
    if (left > right) return 0;
    if (dp[left][right]) return dp[left][right];

    if (isAlice) {
      const leftScore = helper(left + 1, right, false) + piles[left];
      const rightScore = helper(left, right - 1, false) + piles[right];
      dp[left][right] = Math.max(leftScore, rightScore);
      return Math.max(leftScore, rightScore);
    }

    const leftScore = helper(left + 1, right, true) - piles[left];
    const rightScore = helper(left, right - 1, true) - piles[right];
    dp[left][right] = Math.min(leftScore, rightScore);
    return Math.min(leftScore, rightScore);
  };

  return helper(0, piles.length - 1, true) > 0;
};
