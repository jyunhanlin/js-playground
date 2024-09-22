/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function (power) {
  const freq = power.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const dedupePower = Object.keys(freq)
    .sort((a, b) => a - b)
    .map(Number);
  const n = dedupePower.length;
  const dp = new Array(n).fill(0);

  dp[0] = dedupePower[0] * freq[dedupePower[0]];

  for (let i = 1; i < n; i += 1) {
    const curPower = dedupePower[i];
    const curTotalPower = curPower * freq[curPower];

    dp[i] = dp[i - 1];

    let prevIndex = i - 1;

    while (
      prevIndex >= 0 &&
      (dedupePower[prevIndex] === curPower - 1 ||
        dedupePower[prevIndex] === curPower - 2 ||
        dedupePower[prevIndex] === curPower + 1 ||
        dedupePower[prevIndex] === curPower + 2)
    ) {
      prevIndex -= 1;
    }

    dp[i] = Math.max(dp[i], (dp[prevIndex] || 0) + curTotalPower);
  }

  return dp[n - 1];
};
