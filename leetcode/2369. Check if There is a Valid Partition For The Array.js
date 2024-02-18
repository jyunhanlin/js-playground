/**
 * @param {number[]} nums
 * @return {boolean}
 */
var validPartition = function (nums) {
  if (nums.length < 2) return false;

  const dp = new Array(nums.length).fill(false);

  if (nums[0] === nums[1]) {
    dp[1] = true;
  }

  if (
    (nums[0] === nums[1] && nums[1] === nums[2]) ||
    (nums[0] + 1 === nums[1] && nums[1] + 1 === nums[2])
  ) {
    dp[1] = dp[2] = true;
  }

  for (let i = 3; i < nums.length; i += 1) {
    let case1 = false,
      case23 = false;
    if (nums[i - 1] === nums[i]) {
      case1 = dp[i - 2];
    }

    if (
      (nums[i - 2] === nums[i - 1] && nums[i - 1] === nums[i]) ||
      (nums[i - 2] + 1 === nums[i - 1] && nums[i - 1] + 1 === nums[i])
    ) {
      case23 = dp[i - 3];
    }

    dp[i] = case1 || case23;
  }

  return dp[nums.length - 1];
};
