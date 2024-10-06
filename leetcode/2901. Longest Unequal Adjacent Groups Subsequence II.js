/**
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 */
var getWordsInLongestSubsequence = function (words, groups) {
  const n = words.length;
  const dp = new Array(n).fill(1);
  const track = {};

  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (words[j].length !== words[i].length) continue;
      if (groups[j] === groups[i]) continue;
      let diff = 0;
      for (let k = 0; k < words[i].length; k += 1) {
        if (words[j][k] !== words[i][k]) diff += 1;
      }
      if (diff !== 1) continue;

      if (dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        track[i] = j;
      }
    }
  }

  const result = [];
  let index = dp.indexOf(Math.max(...dp));
  while (index !== undefined) {
    result.unshift(words[index]);
    index = track[index];
  }

  return result;
};
