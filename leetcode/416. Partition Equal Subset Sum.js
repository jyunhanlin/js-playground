/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);

  let isCan = false;

  const helper = (index, sum1, sum2) => {
    if (isCan) return;

    if (sum1 === sum2) {
      isCan = true;
      return;
    }
    if (index > nums.length) return;
    else {
      helper(index + 1, sum1 + nums[index], sum2 - nums[index]);
      helper(index + 1, sum1, sum2);
    }
  };

  helper(0, 0, sum);

  return isCan;
};
