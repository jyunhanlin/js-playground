/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  const n = nums.length;
  let dup = -1;

  for (let i = 0; i < n; i += 1) {
    const index = Math.abs(nums[i]) - 1;

    if (nums[index] < 0) dup = Math.abs(nums[i]);
    else nums[index] = -nums[index];
  }

  let missing = -1;
  for (let i = 0; i < n; i += 1) {
    if (nums[i] > 0) missing = i + 1;
  }

  return [dup, missing];
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  const count = new Array(nums.length + 1).fill(0);

  for (const num of nums) {
    count[num] += 1;
  }

  let dup = -1;
  let missing = -1;

  for (let i = 1; i < count.length; i += 1) {
    if (count[i] === 2) dup = i;

    if (count[i] === 0) missing = i;
  }

  return [dup, missing];
};
