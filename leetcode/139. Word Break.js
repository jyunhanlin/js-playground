/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const dp = new Array(s.length + 1).fill(0);
  dp[0] = 1;

  for (let end = 1; end <= s.length; end += 1) {
    for (let start = 0; start < end; start += 1) {
      const w = s.slice(start, end);
      if (dp[start] && wordDict.includes(w)) {
        dp[end] = 1;
        break;
      }
    }
  }

  return dp[s.length];
};
