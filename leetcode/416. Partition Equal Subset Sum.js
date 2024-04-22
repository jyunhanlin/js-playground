/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);

  console.log(sum, sum % 2);

  if (sum % 2 !== 0) return false;

  const half = sum / 2;

  const dp = {};
  dp[0] = true;
  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i];
    for (let j = half; j >= num; j -= 1) {
      dp[j] = dp[j] || dp[j - num];
    }

    if (dp[half]) break;
  }

  return dp[half] || false;
};
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);

  let isCan = false;

  const helper = (index, sum1, sum2) => {
    if (isCan) return;

    if (sum1 === sum2) {
      isCan = true;
      return;
    }
    if (index > nums.length) return;
    else {
      helper(index + 1, sum1 + nums[index], sum2 - nums[index]);
      helper(index + 1, sum1, sum2);
    }
  };

  helper(0, 0, sum);

  return isCan;
};
