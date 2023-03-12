/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  let res = 0;

  const helper = (index, sum) => {
    if (index === nums.length) {
      if (sum % 3 === 0) res = Math.max(res, sum);
    } else {
      helper(index + 1, sum + nums[index]);
      helper(index + 1, sum);
    }
  };

  helper(0, 0);

  return res;
};

var maxSumDivThree = function (nums) {
  const dp = {};

  const helper = (index, remainder) => {
    if (index >= nums.length) return remainder ? -Infinity : 0;

    const key = `${index}-${remainder}`;
    if (dp[key] !== undefined) return dp[key];

    dp[key] = Math.max(
      nums[index] + helper(index + 1, (remainder + nums[index]) % 3),
      helper(index + 1, remainder)
    );

    return dp[key];
  };

  helper(0, 0);

  return dp['0-0'];
};

// https://leetcode.com/problems/greatest-sum-divisible-by-three/solutions/439097/Javascript-and-C++-solutions/
var maxSumDivThree = function (nums) {
  const cur = Array(3).fill(0);
  for (let i = 1; i <= nums.length; ++i) {
    const pre = cur.slice(); // create current from previous 🤔
    for (let j = 0; j < 3; j += 1) {
      const sum = nums[i - 1] + pre[j]; // add A[i] onto each previous bucket (A[i - 1] for A[i] because buckets is offset by 1)
      cur[sum % 3] = Math.max(cur[sum % 3], sum); // update each (current sum % 3) bucket to max of itself and the current sum
    }
  }
  return cur[0]; // max sum of all N items of A which is evenly divisible by 3 🎯
};
