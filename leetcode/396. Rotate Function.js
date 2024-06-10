/**
 * @param {number[]} nums
 * @return {number}
 */
var maxRotateFunction = function (nums) {
  const n = nums.length;
  let total = 0;
  let rotatedSum = 0;

  for (let i = 0; i < n; i += 1) {
    total += nums[i];
    rotatedSum += i * nums[i];
  }

  let ans = rotatedSum;

  for (let i = 1; i < n; i += 1) {
    const num = nums[n - i];
    rotatedSum = rotatedSum - num * (n - 1) + (total - num);
    ans = Math.max(ans, rotatedSum);
  }

  return ans;
};
