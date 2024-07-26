/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k) {
  const total = nums.reduce((a, b) => a + b);
  const sum = total / k;

  if (!Number.isInteger(sum)) return false;

  const visited = new Array(nums.length).fill(false);

  const helper = (start, curK, curSum) => {
    if (curK === 0) return true;

    if (curSum === sum) return helper(0, curK - 1, 0);

    for (let i = start; i < nums.length; i += 1) {
      if (visited[i] || curSum + nums[i] > sum) continue;

      visited[i] = true;

      if (helper(i + 1, curK, curSum + nums[i])) return true;

      visited[i] = false;
    }

    return false;
  };

  return helper(0, k, 0);
};
