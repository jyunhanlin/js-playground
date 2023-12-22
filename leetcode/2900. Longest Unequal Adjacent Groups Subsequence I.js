/**
 * @param {number} n
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 */
var getWordsInLongestSubsequence = function (n, words, groups) {
  let result = [];

  let prevGroup = -1;
  for (let i = 0; i < n; i += 1) {
    if (groups[i] !== prevGroup) {
      prevGroup = groups[i];
      result.push(words[i]);
    }
  }

  return result;
};
