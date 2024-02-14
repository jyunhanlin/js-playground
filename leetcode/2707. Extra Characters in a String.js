/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
var minExtraChar = function (s, dictionary) {
  const dp = new Array(s.length + 1).fill(0);

  for (let i = 1; i <= s.length; i += 1) {
    dp[i] = dp[i - 1] + 1;
    for (let j = 1; j <= i; j += 1) {
      if (dictionary.includes(s.substring(i - j, i))) {
        dp[i] = Math.min(dp[i], dp[i - j]);
      }
    }
  }
  return dp[s.length];
};

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
var minExtraChar = function (s, dictionary) {
  const dp = new Array(s.length + 1).fill(0);

  const helper = (i) => {
    if (i === 0) return 0;
    if (dp[i]) return dp[i];

    dp[i] = helper(i - 1) + 1;

    for (let j = 1; j <= i; j += 1) {
      if (dictionary.includes(s.substring(i - j, i))) {
        dp[i] = Math.min(dp[i], dp[i - j]);
      }
    }

    return dp[i];
  };

  return helper(s.length);
};
