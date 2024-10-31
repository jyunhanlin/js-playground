/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var beautifulSubsets = function (nums, k) {
  const dp = {};

  const helper = (arr) => {
    const n = arr.length;
    if (n === 0) return 0;
    const key = arr.join(',');
    if (dp[key]) return dp[key];

    let count = 0;
    for (let i = 0; i < n; i += 1) {
      const nextArr = [];
      for (let j = i + 1; j < n; j += 1) {
        if (Math.abs(arr[i] - arr[j]) !== k) {
          nextArr.push(arr[j]);
        }
      }
      count = count + 1 + helper(nextArr);
    }

    return (dp[key] = count);
  };

  return helper(nums);
};
