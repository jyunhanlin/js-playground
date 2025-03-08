/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const leftBound = () => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);

      const num = nums[mid];
      if (num === target) right = mid - 1;
      else if (num > target) right = mid - 1;
      else left = mid + 1;
    }

    if (left === nums.lenght) return -1;

    return nums[left] === target ? left : -1;
  };
  const rightBound = () => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);
      const num = nums[mid];
      if (num === target) left = mid + 1;
      else if (num > target) right = mid - 1;
      else left = mid + 1;
    }

    if (right < 0) return -1;

    return nums[right] === target ? right : -1;
  };

  return [leftBound(), rightBound()];
};
