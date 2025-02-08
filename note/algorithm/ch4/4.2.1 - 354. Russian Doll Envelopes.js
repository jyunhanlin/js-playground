/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  envelopes.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  const nums = envelopes.map((a) => a[1]);

  return lengthOfLIS(nums);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1);

  let max = 1;
  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    max = Math.max(max, dp[i]);
  }

  return max;
};
