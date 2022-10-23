const binarySearch = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2); // avoid overflow
    if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
    else return mid;
  }
  return -1;
};

const binarySearch2 = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  //compare the last one
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2); // avoid overflow
    if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
    else return mid;
  }
  return nums[left] === target ? target : -1;
};

const binarySearchWithLeftBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2); // avoid overflow
    if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
    else if (nums[mid] === target) right = mid - 1;
  }

  if (left >= nums.length || nums[left] !== target) return -1;
  return right;
};

const binarySearchWithRightBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2); // avoid overflow
    if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
    else if (nums[mid] === target) left = mid + 1;
  }

  if (right < 0 || nums[right] !== target) return -1;
  return right;
};
