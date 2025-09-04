/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function (nums, lower, upper) {
  const n = nums.length;
  const temp = new Array(n);
  let count = 0;

  const preSum = new Array(n + 1);
  preSum[0] = 0;
  for (let i = 0; i < nums.length; i++) {
    preSum[i + 1] = nums[i] + preSum[i];
  }

  const sort = (lo, hi) => {
    if (lo === hi) return;
    const mid = Math.floor(lo + (hi - lo) / 2);

    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  };

  const merge = (lo, mid, hi) => {
    for (let i = lo; i <= hi; i += 1) {
      temp[i] = preSum[i];
    }

    let start = mid + 1;
    let end = mid + 1;
    for (let i = lo; i <= mid; i++) {
      while (start <= hi && preSum[start] - preSum[i] < lower) {
        start++;
      }
      while (end <= hi && preSum[end] - preSum[i] <= upper) {
        end++;
      }
      count += end - start;
    }

    let i = lo;
    let j = mid + 1;
    for (let p = lo; p <= hi; p += 1) {
      if (i === mid + 1) {
        preSum[p] = temp[j++];
      } else if (j === hi + 1) {
        preSum[p] = temp[i++];
      } else if (temp[i] > temp[j]) {
        preSum[p] = temp[j++];
      } else {
        preSum[p] = temp[i++];
      }
    }
  };

  sort(0, preSum.length - 1);

  return count;
};
