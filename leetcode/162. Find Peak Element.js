/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let left = 0,
    right = nums.length;

  let mid;
  while (left < right) {
    mid = Math.floor(left + (right - left) / 2);

    const midVal = nums[mid];

    let midLeftVal = mid - 1 > -1 ? nums[mid - 1] : -Infinity;
    let midRightVal = mid + 1 < nums.length ? nums[mid + 1] : -Infinity;

    if (midLeftVal < midVal && midRightVal < midVal) break;
    if (midLeftVal > midVal) right = mid;
    else if (midRightVal > midVal) left = mid + 1;
  }

  return mid;
};
