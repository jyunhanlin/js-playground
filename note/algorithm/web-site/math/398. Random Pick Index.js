/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.numsMap = {};

  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i];
    if (!this.numsMap[num]) this.numsMap[num] = [];
    this.numsMap[num].push(i);
  }
};

/**
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function (target) {
  const indices = this.numsMap[target];
  const index = Math.floor(Math.random() * indices.length);
  return indices[index];
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
