/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;

  const memo = new Array(m).fill().map(() => new Array(n).fill(-1));

  const dp = (i, j) => {
    if (i === -1) return j + 1;
    if (j === -1) return i + 1;

    if (memo[i][j] !== -1) return memo[i][j];

    let distance;
    if (word1[i] === word2[j]) {
      distance = dp(i - 1, j - 1); // do nothing
    } else {
      distance = Math.min(
        dp(i - 1, j) + 1, // insert
        dp(i, j - 1) + 1, // delete
        dp(i - 1, j - 1) + 1 // replace
      );
    }

    memo[i][j] = distance;
    return distance;
  };

  return dp(m - 1, n - 1);
};
