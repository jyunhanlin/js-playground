/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
  const df = new Difference(new Array(1001).fill(0));

  for (const [val, i, j] of trips) {
    df.increment(i, j - 1, val);
  }

  const res = df.result();

  for (let i = 0; i < res.length; i += 1) {
    if (res[i] > capacity) return false;
  }

  return true;
};

class Difference {
  constructor(nums) {
    const diff = [];
    diff[0] = nums[0];

    for (let i = 1; i < nums.length; i += 1) {
      diff[i] = nums[i] - nums[i - 1];
    }

    this.diff = diff;
  }

  increment(i, j, val) {
    this.diff[i] += val;
    if (j + 1 < this.diff.length) this.diff[j + 1] -= val;
  }

  result() {
    const res = [];

    res[0] = this.diff[0];
    for (let i = 1; i < this.diff.length; i += 1) {
      res[i] = res[i - 1] + this.diff[i];
    }

    return res;
  }
}
