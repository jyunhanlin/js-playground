/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.nums = nums;
  this.cloned = [...nums];
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  return this.nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  const n = this.nums.length;
  for (let i = 0; i < n; i += 1) {
    // generate random number from [i, n - 1]
    const r = i + Math.floor(Math.random() * (n - i));

    [this.cloned[i], this.cloned[r]] = [this.cloned[r], this.cloned[i]];
  }

  return this.cloned;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
