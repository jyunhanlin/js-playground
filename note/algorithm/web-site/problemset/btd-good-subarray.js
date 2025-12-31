/**
 * @param {number[]} nums
 * @return {number}
 */
var countGoodSubarrays = function (nums) {
  const left = prevGreaterOrEqualElement(nums);
  const right = nextGreaterOrEqualElement(nums);

  const n = nums.length;
  let count = 0;
  for (let i = 0; i < n; i += 1) {
    count += (i - left[i]) * (right[i] - i);
  }

  return count;
};

const prevGreaterOrEqualElement = (nums) => {
  const n = nums.length;
  const res = new Array(n);
  const stack = [];

  for (let i = 0; i < n; i += 1) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop();
    }

    res[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(i);
  }

  return res;
};

const nextGreaterOrEqualElement = (nums) => {
  const n = nums.length;
  const res = new Array(n);
  const stack = [];

  for (let i = n - 1; i >= 0; i -= 1) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop();
    }

    res[i] = stack.length ? stack[stack.length - 1] : n;
    stack.push(i);
  }

  return res;
};

// Time Limit Exceeded
/**
 * @param {number[]} nums
 * @return {number}
 */
var countGoodSubarrays = function (nums) {
  let res = 0;
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < nums.length; j += 1) {
      if (i > j) continue;
      const slice = nums.slice(i, j + 1);

      if (slice.length === new Set(slice).size) res += 1;
    }
  }

  return res;
};
