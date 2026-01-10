var canFillBox = function (N, toys, c) {
  const dp = new Array(N + 1).fill(0);
  dp[0] = 1;

  for (const toy of toys) {
    // from back to front to avoid duplicate
    for (let j = N; j >= toy; j -= 1) {
      if (dp[j - toy]) dp[j] = 1;
    }
  }

  for (let i = 0; i <= N; i += 1) {
    if (dp[i] && c + i >= N) return true;
  }

  return false;
};
