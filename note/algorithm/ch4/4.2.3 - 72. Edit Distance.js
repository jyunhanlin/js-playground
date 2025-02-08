/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const dp = (i, j) => {
    if (i === 0) return j + 1;
    if (j === 0) return i + 1;

    if (word1[i] === word2[j]) {
      return dp(i - 1, j - 1); // do nothing
    } else {
      return Math.min(
        dp(i - 1, j) + 1, // insert
        dp(i, j - 1) + 1, // delete
        dp(i - 1, j - 1) + 1 // replace
      );
    }
  };

  return dp(word1.length, word2.length);
};
