/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  let i = 1;

  while (nums.includes(i)) {
    i += 1;
  }

  return i;
};

console.log(firstMissingPositive([0, 1, 2]));
