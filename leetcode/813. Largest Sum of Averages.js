/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumOfAverages = function (nums, k) {
  const lenIdx = nums.length - 1;
  let result = -Infinity;

  const helper = (i, j, pre, cur, count) => {
    console.log({ i, j, pre, cur, count });
    if (j === lenIdx && count === k) {
      result = Math.max(result, cur + pre / (j - i + 1));
      return;
    } else if (j === lenIdx) return;

    if (count === k) {
      helper(i, j + 1, pre + nums[j + 1], cur, count);
    } else {
      helper(i, j + 1, pre + nums[j + 1], cur, count);
      helper(j + 1, j + 1, nums[j + 1], cur + pre / (j - i + 1), count + 1);
    }
  };

  helper(0, 0, nums[0], 0, 1);

  return result;
};

var largestSumOfAverages = function (A, K) {
  const dp = new Array(A.length);
  for (let i = 0; i < A.length; ++i) {
    dp[i] = new Array(K + 1).fill(0);
  }
  for (let i = 0; i < A.length; ++i) {
    for (let k = 1; k <= K; ++k) {
      let sum = 0;
      for (let j = i; j >= k - 1; --j) {
        sum += A[j];
        dp[i][k] = Math.max(
          dp[i][k],
          k <= 1 ? sum / (i + 1) : (j > 0 ? dp[j - 1][k - 1] : 0) + sum / (i - j + 1)
        );
      }
    }
  }
  return dp[A.length - 1][K];
};
