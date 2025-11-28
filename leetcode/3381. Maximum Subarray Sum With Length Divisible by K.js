/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function (nums, k) {
  const n = nums.length;

  let prefix = 0;
  let answer = -Infinity;

  const minPrefixSum = new Array(k).fill(Infinity);
  minPrefixSum[0] = 0;

  for (let i = 0; i < n; i += 1) {
    prefix += nums[i];

    const remainder = (i + 1) % k;
    answer = Math.max(answer, prefix - minPrefixSum[remainder]);
    minPrefixSum[remainder] = Math.min(prefix, minPrefixSum[remainder]);
  }

  return answer;
};

// time complexity: O(n)
// space complexity: O(k)
