/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const used = new Map();

  const res = [];
  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i];

    if (used.has(target - num)) {
      return [used.get(target - num), i];
    }

    used.set(num, i);
  }

  return null;
};
