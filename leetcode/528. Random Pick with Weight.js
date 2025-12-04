/**
 * @param {number[]} w
 */
var Solution = function (w) {
  this.preSum = [0];
  for (let i = 0; i < w.length; i += 1) {
    this.preSum.push(this.preSum[this.preSum.length - 1] + w[i]);
  }
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  const n = this.preSum.length;

  const target = Math.floor(Math.random() * this.preSum[n - 1]) + 1;

  let left = 0;
  let right = n;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (this.preSum[mid] === target) right = mid;
    else if (this.preSum[mid] < target) left = mid + 1;
    else if (this.preSum[mid] > target) right = mid;
  }

  return left - 1;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
