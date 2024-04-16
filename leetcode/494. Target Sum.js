/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  const dp = {};

  let result = 0;

  const helper = (index, sum) => {
    const key = `${index}__${sum}`;

    if (dp[key] === 0) return 0;

    if (index === nums.length && sum === target) {
      result += 1;
      return 1;
    } else if (index > nums.length) {
      return 0;
    } else {
      const a = helper(index + 1, sum - nums[index]);
      const b = helper(index + 1, sum + nums[index]);
      dp[key] = a | b;
      return a | b;
    }
  };

  helper(0, 0);

  return result;
};
