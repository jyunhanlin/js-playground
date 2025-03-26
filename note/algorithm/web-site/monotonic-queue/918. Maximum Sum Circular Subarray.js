/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  const n = nums.length;
  const preSum = new Array(2 * n + 1).fill(0);
  for (let i = 1; i < preSum.length; i++) {
    preSum[i] = preSum[i - 1] + nums[(i - 1) % n];
  }

  let right = 1;
  let maxSum = -Infinity;
  const win = new MonotonicQueue();
  win.push(0);

  while (right < preSum.length) {
    maxSum = Math.max(maxSum, preSum[right] - win.min());

    if (win.size() === n) {
      win.pop();
    }
    win.push(preSum[right]);
    right += 1;
  }

  return maxSum;
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
