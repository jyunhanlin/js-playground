// runtime error
/**
 * @param {number[]} reward1
 * @param {number[]} reward2
 * @param {number} k
 * @return {number}
 */
var miceAndCheese = function (reward1, reward2, k) {
  const n = reward1.length;
  const memo = new Array(n).fill().map(() => new Array(k + 1).fill(-1));

  const dp = (i, rk) => {
    if (i >= n) {
      if (rk === 0) return 0;
      return -Infinity;
    }

    if (memo[i][rk] !== -1) {
      return memo[i][rk];
    }

    if (rk === 0) {
      let sum = 0;
      while (i < reward2.length) {
        sum += reward2[i];
        i++;
      }
      return sum;
    }

    memo[i][rk] = Math.max(reward1[i] + dp(i + 1, rk - 1), reward2[i] + dp(i + 1, rk));

    return memo[i][rk];
  };

  return dp(0, k);
};
