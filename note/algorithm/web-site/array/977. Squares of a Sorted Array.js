/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  const n = nums.length;
  const res = new Array(n);

  let i = 0;
  let j = n - 1;
  let p = n - 1;

  while (i <= j) {
    if (Math.abs(nums[i]) > Math.abs(nums[j])) {
      res[p] = nums[i] * nums[i];
      i += 1;
    } else {
      res[p] = nums[j] * nums[j];
      j -= 1;
    }

    p -= 1;
  }

  return res;
};
