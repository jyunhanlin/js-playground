var countGoodSubsequences = function (s) {
  const MOD = 1e9 + 7;
  const n = s.length;

  // dp[i][0]: bbb
  // dp[i][1]: aa, baa
  // dp[i][2]: good subsequence
  const dp = new Array(n + 1).fill().map(() => new Array(3).fill(0));

  for (let i = 0; i < n; i += 1) {
    if (s[i] === 'a') {
      dp[i + 1][0] = dp[i][0];
      dp[i + 1][1] = (dp[i][1] + 1 + dp[i][1] + dp[i][0]) % MOD;
      dp[i + 1][2] = (dp[i][2] + dp[i][2]) % MOD;
    } else if (s[i] === 'b') {
      dp[i + 1][0] = (1 + dp[i][0] + dp[i][0]) % MOD;
      dp[i + 1][1] = dp[i][1];
      dp[i + 1][2] = (dp[i][2] + dp[i][2] + dp[i][1]) % MOD;
    }
  }

  return dp[n][2];
};

// time complexity: O(n)
// space complexity: O(n)
