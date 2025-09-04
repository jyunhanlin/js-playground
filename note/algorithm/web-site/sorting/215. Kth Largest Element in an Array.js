/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const shuffle = () => {
    for (let i = nums.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  };

  const partition = (lo, hi) => {
    const pivot = nums[lo];

    let i = lo + 1;
    let j = hi;

    while (i <= j) {
      while (i < hi && nums[i] <= pivot) {
        i += 1;
      }

      while (j > lo && nums[j] > pivot) {
        j -= 1;
      }

      if (i >= j) break;

      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    [nums[lo], nums[j]] = [nums[j], nums[lo]];
    return j;
  };

  shuffle();

  let lo = 0;
  let hi = nums.length - 1;
  k = nums.length - k;

  while (lo <= hi) {
    const p = partition(lo, hi);

    if (p < k) lo = p + 1;
    else if (p > k) hi = p - 1;
    else return nums[p];
  }

  return -1;
};
