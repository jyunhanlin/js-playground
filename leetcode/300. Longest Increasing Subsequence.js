/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const lis = [];
  for (let i = 0; i < nums.length; i += 1) {
    lis.push(1);
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) lis[i] = Math.max(lis[i], lis[j] + 1);
    }
  }
  return nums.length ? Math.max(...lis) : 0;
};
