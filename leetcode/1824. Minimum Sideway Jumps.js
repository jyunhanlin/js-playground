/**
 * @param {number[]} obstacles
 * @return {number}
 */
var minSideJumps = function (obstacles) {
  const dp = [1, 0, 1];

  for (let i = 0; i < obstacles.length; i += 1) {
    const current = obstacles[i];

    if (current !== 0) dp[current - 1] = Infinity;

    for (let j = 0; j < 3; j += 1) {
      if (j + 1 !== current) {
        dp[j] = Math.min(dp[j], Math.min(dp[(j + 1) % 3], dp[(j + 2) % 3]) + 1);
      }
    }
  }

  return Math.min(...dp);
};
