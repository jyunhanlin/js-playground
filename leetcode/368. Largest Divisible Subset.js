/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function (nums) {
  const dp = new Array(nums.length).fill([]);

  nums.sort((a, b) => a - b);
  let max = 0;
  let maxArray;

  for (let i = 0; i < nums.length; i += 1) {
    dp[i] = [nums[i]];
    for (let j = i - 1; j >= 0; j -= 1) {
      if (nums[i] % nums[j] === 0) {
        if (dp[i].length < dp[j].length + 1) {
          dp[i] = [...dp[j], nums[i]];
        }
      }
    }

    if (dp[i].length > max) {
      max = dp[i].length;
      maxArray = dp[i];
    }
  }

  return maxArray;
};
