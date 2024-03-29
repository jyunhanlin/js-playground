/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  const dp = new Array(s.length).fill(0).map(() => new Array(s.length).fill(0));

  let count = 0;

  for (let i = s.length - 1; i >= 0; i -= 1) {
    for (let j = i; j < s.length; j += 1) {
      if (i === j) dp[i][j] = 1;
      else if (i + 1 === j) dp[i][j] = s[i] === s[j] ? 1 : 0;
      else dp[i][j] = s[i] === s[j] ? dp[i + 1][j - 1] : 0;

      count += dp[i][j];
    }
  }

  return count;
};

/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  const mem = {};

  const helper = (i, j) => {
    if (i >= j) return 1;
    if (mem[`${i}-${j}`]) return mem[`${i}-${j}`];

    mem[`${i}-${j}`] = s[i] === s[j] ? helper(i + 1, j - 1) : 0;

    return mem[`${i}-${j}`];
  };

  let count = 0;

  for (let i = 0; i < s.length; i += 1) {
    for (let j = i; j < s.length; j += 1) {
      count += helper(i, j);
    }
  }

  return count;
};
