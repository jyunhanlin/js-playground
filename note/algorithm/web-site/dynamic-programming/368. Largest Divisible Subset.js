/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function (nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);

  const dp = Array.from({ length: n }, () => []);

  dp[0].push(nums[0]);

  for (let i = 1; i < n; i++) {
    let maxSubsetLen = 0,
      index = -1;
    for (let j = 0; j < i; j++) {
      if (nums[i] % nums[j] === 0 && dp[j].length > maxSubsetLen) {
        maxSubsetLen = dp[j].length;
        index = j;
      }
    }

    if (index !== -1) {
      dp[i] = dp[index].slice();
    }
    dp[i].push(nums[i]);
  }

  let res = dp[0];
  for (let i = 1; i < dp.length; i++) {
    if (res.length < dp[i].length) {
      res = dp[i];
    }
  }
  return res;
};
