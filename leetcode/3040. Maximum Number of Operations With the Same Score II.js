/**
 * @param {number[]} nums
 * @return {number}
 */
var maxOperations = function (nums) {
  const n = nums.length;
  const dp = {};

  const helper = (i, j, score) => {
    const key = `${i}-${j}`;

    if (i >= j) return 0;
    if (dp[key]) return dp[key];

    let count = 0;

    if (nums[i] + nums[i + 1] === score) count = Math.max(count, helper(i + 2, j, score) + 1);
    if (nums[j] + nums[j - 1] === score) count = Math.max(count, helper(i, j - 2, score) + 1);
    if (nums[i] + nums[j] === score) count = Math.max(count, helper(i + 1, j - 1, score) + 1);

    dp[key] = count;

    return dp[key];
  };

  return (
    Math.max(
      helper(2, n - 1, nums[0] + nums[1]),
      helper(0, n - 3, nums[n - 1] + nums[n - 2]),
      helper(1, n - 2, nums[0] + nums[n - 1])
    ) + 1
  );
};
