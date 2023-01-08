/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
// Time Limit Exceeded
var numRollsToTarget = function (n, k, target) {
  let res = 0;
  const helper = (rn, rTarget) => {
    if (rn === 0 && rTarget === 0) {
      res += 1;
    } else {
      for (let i = 1; i <= k; i += 1) {
        if (rTarget - i > -1) helper(rn - 1, rTarget - i);
      }
    }
  };

  helper(n, target);

  return res;
};

var numRollsToTarget = function (n, k, target) {
  const dp = { '0-0': 1 };
  const helper = (rn, rt) => {
    const key = `${rn}-${rt}`;
    if (dp[key]) return dp[key];
    if (rn === 0) return 0;

    let res = 0;
    for (let i = 1; i <= k; i += 1) {
      if (rt - i > -1) res += helper(rn - 1, rt - i);
    }

    dp[key] = res % (Math.pow(10, 9) + 7);

    return dp[key];
  };

  helper(n, target);

  return dp[`${n}-${target}`];
};

var numRollsToTarget = function (n, k, target) {
  const dp = new Array(n + 1).fill().map(() => new Array(target + 1).fill(-1));
  const helper = (rn, rt) => {
    if (dp[rn][rt] > -1) return dp[rn][rt];
    if (rn === 0) return (dp[rn][rt] = rt === 0 ? 1 : 0);

    let res = 0;
    for (let i = 1; i <= k; i += 1) {
      if (rt - i > -1) res += helper(rn - 1, rt - i);
    }

    dp[rn][rt] = res % (Math.pow(10, 9) + 7);

    return dp[rn][rt];
  };

  return helper(n, target);
};
