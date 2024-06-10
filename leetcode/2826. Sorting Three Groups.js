/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  // get LIS for 1, 2, and 3
  const n = nums.length;
  const dp = new Array(4).fill(0);

  for (let i = 0; i < n; i += 1) {
    const num = nums[i];

    if (num === 1) {
      dp[1]++;
    } else if (num === 2) {
      dp[2] = 1 + Math.max(dp[1], dp[2]);
    } else {
      dp[3] = 1 + Math.max(dp[1], dp[2], dp[3]);
    }
  }

  return n - Math.max(...dp);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  const n = nums.length;

  const lis = [];
  for (let i = 0; i < nums.length; i += 1) {
    lis.push(1);
    for (let j = 0; j < i; j++) {
      if (nums[i] >= nums[j]) lis[i] = Math.max(lis[i], lis[j] + 1);
    }
  }

  return n - Math.max(...lis);
};
