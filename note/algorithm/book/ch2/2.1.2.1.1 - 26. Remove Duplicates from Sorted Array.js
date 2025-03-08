/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let p1 = 0;
  let p2 = 0;

  while (p1 < nums.length) {
    if (nums[p1] !== nums[p2]) {
      p2 += 1;
      nums[p2] = nums[p1];
    }
    p1 += 1;
  }

  return p2 + 1;
};
