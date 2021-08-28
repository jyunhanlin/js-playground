/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let majIndex = 0,
    count = 0;

  for (let i = 0; i < nums.length; i += 1) {
    const majEl = nums[majIndex];
    const num = nums[i];

    if (majEl === num) count++;
    else {
      count--;

      if (!count) {
        majIndex = i;
        count = 1;
      }
    }
  }
  return nums[majIndex];
};
