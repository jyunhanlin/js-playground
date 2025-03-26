/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var constrainedSubsetSum = function (nums, k) {
  const n = nums.length;
  const win = new MonotonicQueue();

  const dp = [nums[0]];
  win.push(dp[0]);

  let res = dp[0];
  for (let i = 1; i < n; i += 1) {
    dp[i] = Math.max(nums[i], win.max() + nums[i]);

    if (win.size() === k) {
      win.pop();
    }

    win.push(dp[i]);

    res = Math.max(res, dp[i]);
  }

  return res;
};

class MonotonicQueue {
  constructor() {
    this.q = [];
    this.maxq = [];
    this.minq = [];
  }

  push(elem) {
    this.q.push(elem);

    while (this.maxq.length && this.maxq[this.maxq.length - 1] < elem) {
      this.maxq.pop();
    }
    this.maxq.push(elem);

    while (this.minq.length && this.minq[this.minq.length - 1] > elem) {
      this.minq.pop();
    }
    this.minq.push(elem);
  }

  max() {
    return this.maxq[0];
  }

  min() {
    return this.minq[0];
  }

  pop() {
    const deleteVal = this.q.shift();

    if (deleteVal === this.maxq[0]) {
      this.maxq.shift();
    }
    if (deleteVal === this.minq[0]) {
      this.minq.shift();
    }
    return deleteVal;
  }

  size() {
    return this.q.length;
  }

  isEmpty() {
    return this.q.length === 0;
  }
}
