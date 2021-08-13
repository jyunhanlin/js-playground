/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) return [];

  const results = [];

  nums = nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i += 1) {
    const remaining = 0 - nums[i];

    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1,
      right = nums.length - 1;

    while (left < right) {
      const a = nums[left];
      const b = nums[right];

      if (a + b === remaining) {
        results.push([nums[i], nums[left], nums[right]]);

        left++;
        while (nums[left] === nums[left - 1]) {
          left++;
        }
      } else if (a + b > remaining) {
        right--;
      } else {
        left++;
      }
    }
  }

  return results;
};
