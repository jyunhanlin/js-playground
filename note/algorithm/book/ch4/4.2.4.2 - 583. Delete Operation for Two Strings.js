/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;

  const lcs = longestCommonSubsequence(word1, word2);

  return m - lcs + n - lcs;
};

var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;

  const memo = new Array(m).fill().map(() => new Array(n).fill(-1));

  const dp = (i, j) => {
    if (i === -1 || j === -1) return 0;

    if (memo[i][j] !== -1) return memo[i][j];

    let len;
    if (text1[i] === text2[j]) len = dp(i - 1, j - 1) + 1;
    else len = Math.max(dp(i - 1, j), dp(i, j - 1));

    memo[i][j] = len;

    return len;
  };

  return dp(m - 1, n - 1);
};
