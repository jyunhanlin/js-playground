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

// dp[i][j] means the biggest number of stones you can get more than opponent picking piles in piles[i] ~ piles[j].
// You can first pick piles[i] or piles[j].

// If you pick piles[i], your result will be piles[i] - dp[i + 1][j]
// If you pick piles[j], your result will be piles[j] - dp[i][j - 1]
// So we get:
// dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])

/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
  const n = piles.length;
  const dp = new Array(n).fill().map(() => new Array(n).fill(0));

  for (let i = 0; i < n; i += 1) dp[i][i] = piles[i];

  for (let d = 1; d < n; d += 1)
    for (let i = 0; i < n - d; i += 1)
      dp[i][i + d] = Math.max(piles[i] - dp[i + 1][i + d], piles[i + d] - dp[i][i + d - 1]);

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
