/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
  const preSum = [0];

  for (let i = 1; i <= nums.length; i += 1) {
    preSum[i] = preSum[i - 1] + nums[i - 1];
  }

  let left = 0;
  let right = 0;
  const win = new MonotonicQueue();

  let res = Infinity;

  while (right <= preSum.length) {
    win.push(preSum[right]);
    right += 1;

    while (win.size() && preSum[right] - win.min() >= k) {
      res = Math.min(res, right - left);
      win.pop();
      left += 1;
    }
  }

  return res === Infinity ? -1 : res;
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
