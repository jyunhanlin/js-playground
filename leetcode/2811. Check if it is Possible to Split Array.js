// TLE
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {boolean}
 */
var canSplitArray = function (nums, m) {
  if (nums.length === 1) return true;

  const dp = {};

  const helper = (i, j, sum) => {
    if (j - i === 1) return true;

    const key = `${i}-${j}`;
    if (dp[key]) return dp[key];

    let result = false;
    const preSum = sum - nums[j];

    if (preSum >= m) {
      result |= helper(i, j - 1, preSum);
    }

    const postSum = sum - nums[i];
    if (postSum >= m) {
      result |= helper(i + 1, j, postSum);
    }

    dp[key] = result;

    return dp[key];
  };

  return helper(
    0,
    nums.length - 1,
    nums.reduce((a, b) => a + b)
  );
};

// TLE
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {boolean}
 */
var canSplitArray = function (nums, m) {
  const dp = {};

  const helper = (arr) => {
    if (arr.length === 1) return true;

    const key = arr.join(',');
    if (dp[key]) return dp[key];

    let result = false;
    const preArr = arr.slice(0, arr.length - 1);
    if (preArr.reduce((a, b) => a + b) >= m || preArr.length === 1) {
      result |= helper(preArr);
    }

    const postArr = arr.slice(1);
    if (postArr.reduce((a, b) => a + b) >= m || postArr.length === 1) {
      result |= helper(postArr);
    }

    dp[key] = result;

    return dp[key];
  };

  return helper(nums);
};
