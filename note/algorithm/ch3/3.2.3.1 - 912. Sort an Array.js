/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  const shuffle = () => {
    for (let i = 0; i < nums.length; i += 1) {
      const randomIndex = i + Math.floor(Math.random() * (nums.length - i));
      [nums[i], nums[randomIndex]] = [nums[randomIndex], nums[i]];
    }
  };

  const partition = (lo, hi) => {
    const pivot = nums[lo];
    let i = lo + 1;
    let j = hi;

    while (i <= j) {
      while (i < hi && nums[i] <= pivot) i += 1;
      while (j > lo && nums[j] > pivot) j -= 1;

      if (i >= j) break;

      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    [nums[lo], nums[j]] = [nums[j], nums[lo]];

    return j;
  };

  const sort = (lo, hi) => {
    if (lo >= hi) return;

    const p = partition(lo, hi);

    sort(lo, p - 1);
    sort(p + 1, hi);
  };

  shuffle();
  sort(0, nums.length - 1);

  return nums;
};
