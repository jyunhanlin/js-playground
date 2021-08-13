/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const results = nums.map(() => 1);
  let product = 1;

  for (let i = 0; i < nums.length; i += 1) {
    results[i] *= product;
    product *= nums[i];
  }

  product = 1;

  for (let i = nums.length - 1; i >= 0; i -= 1) {
    results[i] *= product;
    product *= nums[i];
  }

  return results;
};
