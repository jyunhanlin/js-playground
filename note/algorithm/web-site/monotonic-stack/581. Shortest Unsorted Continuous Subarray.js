/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
  const n = nums.length;
  let left = Infinity,
    right = -Infinity;
  let stack = [];

  for (let i = 0; i < n; i++) {
    while (stack.length && nums[stack[stack.length - 1]] > nums[i]) {
      left = Math.min(left, stack.pop());
    }
    stack.push(i);
  }

  stack = [];

  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      right = Math.max(right, stack.pop());
    }
    stack.push(i);
  }

  if (left === Infinity && right === -Infinity) {
    return 0;
  }
  return right - left + 1;

  // const n = nums.length;
  // const temp = nums.slice();
  // temp.sort((a, b) => a - b);
  // let left = Infinity,
  //   right = -Infinity;

  // for (let i = 0; i < n; i++) {
  //   if (temp[i] !== nums[i]) {
  //     left = i;
  //     break;
  //   }
  // }

  // for (let i = n - 1; i >= 0; i--) {
  //   if (temp[i] !== nums[i]) {
  //     right = i;
  //     break;
  //   }
  // }

  // if (left === Infinity && right === -Infinity) {
  //   return 0;
  // }
  // return right - left + 1;
};
