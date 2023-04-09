/**
 * @param {number} n
 * @return {number}
 */

var knightDialer = function (n) {
  let dp = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const mod = 10 ** 9 + 7;
  for (let i = 2; i <= n; i++) {
    dp = [
      (dp[4] + dp[6]) % mod, // 0
      (dp[6] + dp[8]) % mod, // 1
      (dp[7] + dp[9]) % mod, // 2 ...
      (dp[4] + dp[8]) % mod,
      (dp[3] + dp[9] + dp[0]) % mod,
      0,
      (dp[1] + dp[7] + dp[0]) % mod,
      (dp[2] + dp[6]) % mod,
      (dp[1] + dp[3]) % mod,
      (dp[4] + dp[2]) % mod,
    ];
  }
  return dp.reduce((acc, cur) => (acc + cur) % mod, 0);
};

// space not enough
var knightDialer = function (n) {
  const dp = new Array(n + 1).fill([]);
  dp[1] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 2; i <= n; i += 1) {
    for (let j = 0; j < dp[i - 1].length; j += 1) {
      const num = dp[i - 1][j];
      const lastNum = num % 10;
      dp[i].push(...NEXT_NUMS[lastNum]);
    }
  }

  return dp[n].length;
};

const NEXT_NUMS = {
  0: [4, 6],
  1: [6, 8],
  2: [7, 9],
  3: [4, 8],
  4: [0, 3, 9],
  5: [],
  6: [0, 1, 7],
  7: [2, 6],
  8: [1, 3],
  9: [2, 4],
};
