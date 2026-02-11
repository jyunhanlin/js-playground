var minRemainingCapacity = function (capacity, goods) {
  const n = goods.length;

  const dp = new Array(n + 1).fill().map(() => new Array(capacity + 1).fill(0));
  dp[0][capacity] = 1;

  for (let i = 1; i <= n; i += 1) {
    const good = goods[i - 1];

    for (let j = capacity; j >= 0; j -= 1) {
      if (dp[i - 1][j]) {
        dp[i][j] = dp[i - 1][j];

        if (j - good >= 0) dp[i][j - good] = 1;
      }
    }
  }

  for (let i = 0; i <= capacity; i += 1) {
    if (dp[n][i]) return i;
  }

  return -1;
};
