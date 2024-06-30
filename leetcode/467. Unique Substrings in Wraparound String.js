/**
 * @param {string} s
 * @return {number}
 */
var findSubstringInWraproundString = function (s) {
  const dp = {};

  dp[s[0]] = 1;
  let curMax = 1;

  for (let i = 1; i < s.length; i += 1) {
    const prev = s[i - 1].charCodeAt();
    const cur = s[i].charCodeAt();

    if (cur - prev === 1 || cur - prev === -25) curMax += 1;
    else curMax = 1;

    dp[s[i]] = Math.max(dp[s[i]] || 1, curMax);
  }

  let result = 0;

  Object.keys(dp).forEach((letter) => {
    result += dp[letter];
  });

  return result;
};
