/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVII = function (stones) {
  const dp = new Array(stones.length).fill().map(() => new Array(stones.length).fill(0));
  const total = stones.reduce((a, c) => (a += c), 0);

  const helper = (left, right, remaining) => {
    if (left > right) return 0;
    if (dp[left][right]) return dp[left][right];

    const leftScore =
      remaining - stones[left] - helper(left + 1, right, remaining - stones[left], true);
    const rightScore =
      remaining - stones[right] - helper(left, right - 1, remaining - stones[right], true);

    dp[left][right] = Math.max(leftScore, rightScore);

    return dp[left][right];
  };

  return helper(0, stones.length - 1, total);
};
