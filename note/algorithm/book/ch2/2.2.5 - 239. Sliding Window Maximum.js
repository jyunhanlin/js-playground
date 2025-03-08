/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const res = [];

  const queue = [];
  let max = -Infinity;
  for (let i = 0; i < nums.length; i += 1) {
    if (queue.length < k) {
      queue.push(nums[i]);
      max = Math.max(max, nums[i]);
      if (queue.length === k) {
        res.push(max);
      }
    } else {
      queue.shift();
      queue.push(nums[i]);
      max = Math.max(...queue);
      res.push(max);
    }
  }

  return res;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const res = [];
  const window = new MonotonicQueue();

  for (let i = 0; i < nums.length; i += 1) {
    if (i < k - 1) {
      window.push(nums[i]);
    } else {
      window.push(nums[i]);
      res.push(window.max());
      window.pop(nums[i - k + 1]);
    }
  }

  return res;
};

class MonotonicQueue {
  q = [];

  push(n) {
    while (this.q.length) {
      if (this.q[this.q.length - 1] >= n) break;
      this.q.pop();
    }

    this.q.push(n);
  }

  max() {
    return this.q[0];
  }

  pop(n) {
    if (n === this.q[0]) {
      this.q.shift();
    }
  }
}
