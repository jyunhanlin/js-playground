/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, indexDiff, valueDiff) {
  const n = nums.length;
  let left = 0;
  let right = 0;

  const win = new Map();

  while (right < n) {
    const num = nums[right];
    const bucket = Math.floor(num / (valueDiff + 1));

    if (win.has(bucket)) return true;

    if (win.has(bucket - 1) && Math.abs(num - win.get(bucket - 1)) <= valueDiff) {
      return true;
    }

    if (win.has(bucket + 1) && Math.abs(num - win.get(bucket + 1)) <= valueDiff) {
      return true;
    }

    win.set(bucket, num);

    right += 1;

    while (right - left > indexDiff) {
      win.delete(Math.floor(nums[left] / (valueDiff + 1)));
      left += 1;
    }
  }

  return false;
};
