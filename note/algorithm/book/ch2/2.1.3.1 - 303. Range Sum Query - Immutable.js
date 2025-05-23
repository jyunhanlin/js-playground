/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.preSum = [0];

  for (let i = 1; i <= nums.length; i += 1) {
    this.preSum[i] = nums[i - 1] + this.preSum[i - 1];
  }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  return this.preSum[right + 1] - this.preSum[left];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
