/**
 * @param {string} word
 * @return {number}
 */
var addMinimum = function (word) {
  const dp = new Array(word.length + 1).fill(Infinity);
  dp[0] = 0;
  dp[1] = 2;

  const helper = (index) => {
    if (index === 0) return 0;
    if (dp[index] !== Infinity) return dp[index];

    if (
      word.charCodeAt(index - 1) > word.charCodeAt(index - 2) &&
      word.charCodeAt(index - 2) > word.charCodeAt(index - 3)
    ) {
      dp[index] = helper(index - 3);
    } else if (word.charCodeAt(index - 1) > word.charCodeAt(index - 2)) {
      dp[index] = helper(index - 2) + 1;
    } else {
      dp[index] = helper(index - 1) + 2;
    }

    return dp[index];
  };

  return helper(word.length);
};
