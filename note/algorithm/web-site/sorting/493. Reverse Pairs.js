/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
  // use merge sort
  const n = nums.length;
  const temp = new Array(n);
  let count = 0;

  const sort = (lo, hi) => {
    if (lo === hi) return;
    const mid = Math.floor(lo + (hi - lo) / 2);

    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  };

  const merge = (lo, mid, hi) => {
    for (let i = lo; i <= hi; i += 1) {
      temp[i] = nums[i];
    }

    // for (let i = lo; i <= mid; i += 1) {
    //     for (let j = mid + 1; j <= hi; j += 1) {
    //         if (nums[i] > 2 * nums[j] ) count += 1;
    //     }
    // }
    let end = mid + 1;
    for (let i = lo; i <= mid; i += 1) {
      while (end <= hi && nums[i] > 2 * nums[end]) {
        end += 1;
      }

      count += end - (mid + 1);
    }

    let i = lo;
    let j = mid + 1;

    for (let p = lo; p <= hi; p += 1) {
      if (i === mid + 1) {
        nums[p] = temp[j++];
      } else if (j === hi + 1) {
        nums[p] = temp[i++];
      } else if (temp[i] > temp[j]) {
        nums[p] = temp[j++];
      } else {
        nums[p] = temp[i++];
      }
    }
  };

  sort(0, n - 1);

  return count;
};
