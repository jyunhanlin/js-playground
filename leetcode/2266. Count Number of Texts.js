/**
 * @param {string} pressedKeys
 * @return {number}
 */
var countTexts = function (pressedKeys) {
  const MOD = 1e9 + 7;
  const n = pressedKeys.length;
  const dp = new Array(n + 1).fill(0);

  dp[0] = 1;

  for (let i = 0; i < n; i += 1) {
    let lookbehind = 3;
    const curKey = pressedKeys[i];
    if (curKey === '7' || curKey === '9') lookbehind = 4;

    for (let j = 1; j <= lookbehind; j += 1) {
      if (i - j + 1 < 0 || curKey !== pressedKeys[i - j + 1]) break;
      dp[i + 1] += dp[i - j + 1];
    }

    dp[i + 1] %= MOD;
  }

  return dp[n];
};
