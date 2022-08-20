/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < target; i += 1) {
    if (!dp[i]) continue;
    for (const num of nums) {
      if (i + num <= target) dp[i + num] += dp[i];
    }
  }

  return dp[target];
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  let result = 0;

  const backtracking = (total) => {
    if (total === target) result += 1;
    else {
      for (const num of nums) {
        const newTotal = num + total;
        if (newTotal > target) continue;
        backtracking(newTotal);
      }
    }
  };

  for (const num of nums) {
    backtracking(num);
  }

  return result;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  let result = 0;
  const queue = nums.map((num) => num);

  while (queue.length) {
    const cur = queue.shift();

    if (cur === target) result += 1;
    else
      for (const num of nums) {
        if (cur + num === target) result += 1;
        else if (cur + num < target) {
          queue.push(cur + num);
        }
      }
  }

  return result;
};
