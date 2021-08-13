/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const midVal = nums[mid];
    const leftVal = nums[left];
    const rightVal = nums[right];

    if (midVal === target) return mid;
    else if (leftVal === target) return left;
    else if (rightVal === target) return right;

    if (leftVal < midVal && leftVal < target && target < midVal) {
      right = mid - 1;
    } else if (midVal < leftVal && (target < midVal || target > leftVal)) {
      right = mid - 1;
    } else if (midVal < rightVal && midVal < target && target < rightVal) {
      left = mid + 1;
    } else if (midVal > rightVal && (target < rightVal || target > midVal)) {
      left = mid + 1;
    } else {
      break;
    }
  }

  return -1;
};

/**
 * Concept:
 * 1. 找到轉折點
 * 2. 分別對兩邊做binary search
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const inflectionIndex = findInflectionIndex(nums);
  console.log(inflectionIndex);

  return Math.max(
    binarySearch(nums, target, 0, inflectionIndex - 1),
    binarySearch(nums, target, inflectionIndex, nums.length - 1)
  );
};

const findInflectionIndex = (nums) => {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < nums[mid - 1]) return mid;

    if (nums[mid + 1] < nums[mid]) return mid + 1;

    if (nums[mid] > nums[left]) left = mid + 1;
    else right = mid - 1;
  }

  return nums.length - 1;
};

const binarySearch = (nums, target, startIndex, endIndex) => {
  let left = startIndex,
    right = endIndex;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    if (nums[mid] > target) right = mid - 1;
    else left = mid + 1;
  }

  return -1;
};
