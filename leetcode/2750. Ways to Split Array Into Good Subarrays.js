// TLE
/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfGoodSubarraySplits = function (nums) {
  if (nums.reduce((acc, cur) => acc + cur) === 0) return 0;

  const MOD = 1e9 + 7;
  const n = nums.length;
  const dp = {};
  const helper = (index, count) => {
    if (index < 0 && count === 1) return 1;
    if (index < 0) return 0;
    if (nums[index] === 1) count += 1;
    if (count > 1) return 0;

    const key = `${index}-${count}`;
    if (dp[key]) return dp[key];

    const pick = helper(index - 1, count);

    let skip = count === 1 ? helper(index - 1, 0) : 0;

    dp[key] = (pick + skip) % MOD;

    return dp[key];
  };

  return helper(n - 1, 0);
};
