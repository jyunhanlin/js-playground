/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (s, words) {
  let result = 0;
  const dp = {};

  for (const word of words) {
    if (dp[word] === 1) {
      result += 1;
      continue;
    } else if (dp[word] === 0) continue;

    let i = 0,
      j = 0;

    while (i < s.length && j < word.length) {
      if (s[i] === word[j]) {
        i += 1;
        j += 1;
      } else {
        i += 1;
      }
    }

    if (j === word.length) {
      dp[word] = 1;
      result += 1;
    } else {
      dp[word] = 0;
    }
  }

  return result;
};
