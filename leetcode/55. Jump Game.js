/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  if (nums.length === 1) return true;

  if (nums[0] === 0) return false;

  const dp = [true];

  for (let i = 0; i < nums.length; i += 1) {
    if (dp[i] > 0) {
      for (let j = 1; j <= nums[i]; j += 1) {
        dp[i + j] = true;
      }
    }

    if (dp[nums.length - 1]) return true;
  }

  return false;
};

// Greedy
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    if (max < i) return false;
    max = Math.max(i + nums[i], max);
  }
  return true;
};
