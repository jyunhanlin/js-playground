/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumTotalCost = function (nums) {
  let addMax = nums[0];
  let subMax = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    const tempAddMax = Math.max(addMax, subMax) + nums[i];
    const tempSubMax = addMax - nums[i];

    addMax = tempAddMax;
    subMax = tempSubMax;
  }

  return Math.max(addMax, subMax);
};
