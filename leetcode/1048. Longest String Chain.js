/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
  words.sort((s1, s2) => s1.length - s2.length);
  const dp = {};
  let res = 0;
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    if (!dp[word]) dp[word] = 1;
    for (let s = 0; s < word.length; s += 1) {
      const sub = word.slice(0, s) + word.slice(s + 1);
      dp[word] = Math.max(dp[word], (dp[sub] || 0) + 1);
    }
    res = Math.max(res, dp[word]);
  }

  return res;
};
