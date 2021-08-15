/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length < 3) return Math.max(...nums);

  const dp = [nums[0], nums[1]];

  for (let i = 2; i < nums.length; i += 1) {
    const beforeDp = dp.slice(0, i - 1);

    dp[i] = Math.max(...beforeDp) + nums[i];
  }

  return Math.max(...dp);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length < 3) return Math.max(...nums);

  let max = Math.max(nums[0], nums[1]);

  const dp = [nums[0], max];

  for (let i = 2; i < nums.length; i += 1) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);

    max = Math.max(max, dp[i]);
  }

  return max;
};
