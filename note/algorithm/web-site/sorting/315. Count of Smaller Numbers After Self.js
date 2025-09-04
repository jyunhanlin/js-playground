/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
  // use merge sort
  const n = nums.length;
  const temp = new Array(n);
  const count = new Array(n).fill(0);
  const arr = nums.map((num, i) => [num, i]);

  const sort = (lo, hi) => {
    if (lo === hi) return;
    const mid = Math.floor(lo + (hi - lo) / 2);

    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  };

  const merge = (lo, mid, hi) => {
    for (let i = lo; i <= hi; i += 1) {
      temp[i] = arr[i];
    }

    let i = lo;
    let j = mid + 1;

    for (let p = lo; p <= hi; p += 1) {
      if (i === mid + 1) {
        arr[p] = temp[j++];
      } else if (j === hi + 1) {
        arr[p] = temp[i++];
        count[arr[p][1]] += j - mid - 1;
      } else if (temp[i][0] > temp[j][0]) {
        arr[p] = temp[j++];
      } else {
        arr[p] = temp[i++];
        count[arr[p][1]] += j - mid - 1;
      }
    }
  };

  sort(0, n - 1);

  return count;
};
