/**
 * @param {string[]} words
 * @return {number}
 */
var minimizeConcatenatedLength = function (words) {
  const n = words.length;

  const dp = new Array(n).fill().map(() => new Array(26).fill().map(() => new Array(26).fill()));

  const getStrIndex = (str, index) => str.charCodeAt(index) - 97;

  const helper = (index, first, last) => {
    if (index >= n) return 0;
    if (dp[index][first][last]) return dp[index][first][last];

    const word = words[index];
    const newFirst = getStrIndex(word, 0);
    const newLast = getStrIndex(word, word.length - 1);

    let len1 = word.length + helper(index + 1, first, newLast);
    if (last === newFirst) len1 -= 1;

    let len2 = word.length + helper(index + 1, newFirst, last);
    if (newLast === first) len2 -= 1;

    dp[index][first][last] = Math.min(len1, len2);

    return dp[index][first][last];
  };

  return (
    words[0].length +
    helper(1, getStrIndex(words[0], 0), getStrIndex(words[0], words[0].length - 1))
  );
};
