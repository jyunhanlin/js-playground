/**
 * @param {number[]} nums
 * @return {number}
 */
var specialPerm = function (nums) {
  const MOD = 1e9 + 7;
  const n = nums.length;
  const dp = {};

  const fullMask = (1 << n) - 1;

  const helper = (index, mask) => {
    if (mask === fullMask) return 1;
    const key = `${index}-${mask}`;
    if (dp[key]) return dp[key];

    let ans = 0;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) continue;
      if (nums[i] % nums[index] === 0 || nums[index] % nums[i] === 0) {
        let newMask = mask | (1 << i);
        ans = (ans + helper(i, newMask)) % MOD;
      }
    }

    return (dp[key] = ans);
  };

  let res = 0;

  for (let i = 0; i < n; i += 1) {
    res = (res + helper(i, 1 << i)) % MOD;
  }
  return res;
};
