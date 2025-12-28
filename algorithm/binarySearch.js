const binarySearch = (nums, target) => {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
    else if (nums[mid] === target) return mid;
  }
  return nums[left] === target ? target : -1;
};

const binarySearch2 = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
    else if (nums[mid] === target) return mid;
  }
  return -1;
};

const binarySearchWithLeftBound = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
    else if (nums[mid] === target) right = mid - 1;
  }

  if (left < 0 || left >= nums.length) return -1;

  // if comment the logic
  // when the target is not in the array,
  // the left will be the index of the first element greater than the target
  if (nums[left] !== target) return -1;

  return left;
};

const binarySearchWithRightBound = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
    else if (nums[mid] === target) left = mid + 1;
  }

  if (right < 0 || right >= nums.length) return -1;

  // if comment the logic,
  // when the target is not in the array,
  // the right will be the index of the last element less than the target
  if (nums[right] !== target) return -1;

  return right;
};
