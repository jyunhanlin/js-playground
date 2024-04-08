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

/**
 * @param {string} pressedKeys
 * @return {number}
 */
var countTexts = function (pressedKeys) {
  const MOD = 1e9 + 7;
  const n = pressedKeys.length;
  const dp = new Array(n + 1).fill(0);

  dp[0] = 1;

  let lastChar = '';
  let repeatCount = 0;

  for (let i = 1; i <= n; ++i) {
    const currChar = pressedKeys[i - 1];

    if (currChar != lastChar) repeatCount = 0;

    lastChar = currChar;
    repeatCount += 1;

    dp[i] = dp[i - 1];

    if (i >= 2 && repeatCount >= 2) dp[i] += dp[i - 2];
    if (i >= 3 && repeatCount >= 3) dp[i] += dp[i - 3];
    if ((currChar == '7' || currChar == '9') && i >= 4 && repeatCount >= 4) dp[i] += dp[i - 4];

    dp[i] %= MOD;
  }

  return dp[n];
};
