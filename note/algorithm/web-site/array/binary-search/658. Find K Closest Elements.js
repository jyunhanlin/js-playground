/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  const p = leftBound(arr, x);

  let left = p - 1;
  let right = p;
  const res = [];

  while (right - left - 1 < k) {
    if (left === -1) {
      res.push(arr[right]);
      right++;
    } else if (right === arr.length) {
      res.unshift(arr[left]);
      left--;
    } else if (x - arr[left] > arr[right] - x) {
      res.push(arr[right]);
      right++;
    } else {
      res.unshift(arr[left]);
      left--;
    }
  }
  return res;
};

function leftBound(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    }
  }
  return left;
}
