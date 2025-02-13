// Time Limit Exceeded
// use the number in nums as the view point
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k) {
  const n = nums.length;

  if (k > n) return false;
  const sum = nums.reduce((a, b) => a + b);
  if (sum % k !== 0) return false;

  const bucket = new Array(k).fill(0);
  const target = sum / k;

  const backtrack = (index) => {
    if (index === n) {
      for (let i = 0; i < k; i += 1) {
        if (bucket[i] !== target) return false;
      }

      return true;
    }

    for (let i = 0; i < k; i += 1) {
      if (bucket[i] + nums[index] > target) continue;

      bucket[i] += nums[index];

      if (backtrack(index + 1)) return true;

      bucket[i] -= nums[index];
    }

    return false;
  };
  return backtrack(0);
};

// use k as the view point
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k) {
  const n = nums.length;

  if (k > n) return false;
  const sum = nums.reduce((a, b) => a + b);
  if (sum % k !== 0) return false;

  const target = sum / k;

  const used = new Array(n).fill(0);

  const backtrack = (start, remainK, currentSum) => {
    if (remainK === 0) return true;
    if (currentSum === target) {
      const res = backtrack(0, remainK - 1, 0);
      return res;
    }

    for (let i = start; i < n; i += 1) {
      if (used[i]) continue;

      if (nums[i] + currentSum > target) continue;

      used[i] = 1;
      if (backtrack(i + 1, remainK, currentSum + nums[i])) return true;
      used[i] = 0;
    }

    return false;
  };
  return backtrack(0, k, 0);
};
