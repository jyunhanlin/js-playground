/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const n = nums.length;
  const res = [];
  const stack = [];
  for (let i = 2 * n - 1; i >= 0; i -= 1) {
    while (stack.length) {
      if (stack[stack.length - 1] > nums[i % n]) break;
      stack.pop();
    }

    res[i % n] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(nums[i % n]);
  }

  return res;
};
