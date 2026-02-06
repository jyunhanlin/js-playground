var count1145Subsequence = function (s) {
  const n = s.length;
  if (n < 4) return 0;
  const MOD = 1e9 + 7;

  let dp11 = 0;
  let dp4 = 0;
  let dp5 = 0;

  for (let i = 1; i < n; i += 1) {
    if (s[i] === '1' && s[i - 1] === '1') {
      dp11 = (dp11 + 1) % MOD;
    } else if (s[i] === '4') {
      dp4 = (dp4 + dp11) % MOD;
    } else if (s[i] === '5') {
      dp5 = (dp5 + dp4) % MOD;
    }
  }

  return dp5;
};
