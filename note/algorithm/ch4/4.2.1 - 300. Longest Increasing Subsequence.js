/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1);

  let max = 1;
  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    max = Math.max(max, dp[i]);
  }

  return max;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length;
  const top = new Array(n).fill(0);
  let piles = 0;

  for (let i = 0; i < n; i += 1) {
    const poker = nums[i];

    let left = 0;
    let right = piles;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (top[mid] > poker) {
        right = mid;
      } else if (top[mid] < poker) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === piles) piles += 1;
    top[left] = poker;
  }

  return piles;
};
