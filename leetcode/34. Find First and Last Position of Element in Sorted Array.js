/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  if (nums.length < 1) return [-1, -1];

  const firstPos = binarySearch(nums, target, 0, nums.length - 1);

  if (firstPos === -1) return [-1, -1];

  let endPos = firstPos,
    startPos = firstPos,
    temp1,
    temp2;

  while (startPos !== -1) {
    temp1 = startPos;
    startPos = binarySearch(nums, target, 0, startPos - 1);
  }
  startPos = temp1;

  while (endPos !== -1) {
    temp2 = endPos;
    endPos = binarySearch(nums, target, endPos + 1, nums.length - 1);
  }
  endPos = temp2;

  return [startPos, endPos];
};

const binarySearch = (nums, target, left, right) => {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    if (nums[mid] > target) right = mid - 1;
    else left = mid + 1;
  }

  return -1;
};
