/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function (matchsticks) {
  const sum = matchsticks.reduce((a, b) => a + b, 0);
  if (sum % 4 != 0 || matchsticks.length < 4) return false;

  const sideLen = sum / 4;

  const dp = new Array(4).fill(0);
  const len = matchsticks.length;
  matchsticks.sort((a, b) => b - a);

  const helper = (index) => {
    if (index == len) {
      return dp.every((side) => side == sideLen);
    }

    for (let i = 0; i < 4; i++) {
      if (dp[i] + matchsticks[index] > sideLen) {
        continue;
      }
      dp[i] += matchsticks[index];
      if (helper(index + 1)) return true;
      dp[i] -= matchsticks[index];
    }
    return false;
  };

  return helper(0);
};
