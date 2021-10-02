/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let cum = 0;
  let max = 0;

  for (let i = 0; i < nums.length; i += 1) {
    const cur = nums[i];

    if (cur === 1) cum++;
    else {
      max = Math.max(cum, max);
      cum = 0;
    }
  }

  return Math.max(cum, max);
};
