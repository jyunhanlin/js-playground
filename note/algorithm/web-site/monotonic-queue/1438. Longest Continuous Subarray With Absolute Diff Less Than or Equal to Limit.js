/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function (nums, limit) {
  const n = nums.length;
  let left = 0;
  let right = 0;
  let winSize = 0;
  let win = new MonotonicQueue();
  let res = 0;

  while (right < n) {
    win.push(nums[right]);
    right += 1;
    winSize += 1;

    while (win.max() - win.min() > limit) {
      win.pop();
      left += 1;
      winSize -= 1;
    }

    res = Math.max(res, winSize);
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
