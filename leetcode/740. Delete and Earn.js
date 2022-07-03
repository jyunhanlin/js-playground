/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const numsObj = {};
  let maxNumber = 0;

  for (let i = 0; i < nums.length; i += 1) {
    numsObj[nums[i]] = numsObj[nums[i]] ? (numsObj[nums[i]] += nums[i]) : nums[i];
    maxNumber = Math.max(maxNumber, nums[i]);
  }

  // top-down dp
  //     const dpObj = {}

  //     const maxPoints = (num) => {
  //         if (num === 0) return 0;
  //         if (num === 1) return numsObj["1"] || 0;
  //         if (dpObj[num]) return dpObj[num];

  //         const curNum = numsObj[num] || 0;

  //         dpObj[num] = Math.max(maxPoints(num -1), maxPoints(num - 2) + curNum);

  //         return dpObj[num]
  //     }

  //     return maxPoints(maxNumber)

  // bottom-up dp
  const dp = [];

  dp[0] = 0;
  dp[1] = numsObj[1] || 0;

  for (let i = 2; i <= maxNumber; i += 1) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + (numsObj[i] || 0));
  }

  return dp[maxNumber];
};
