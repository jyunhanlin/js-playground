/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  nums.sort((a, b) => a - b);
  const numsObj = nums.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: (acc[cur] || 0) + cur,
    }),
    {}
  );

  const keys = Object.keys(numsObj).map(Number);

  const memo = new Array(keys.length).fill(-1);

  const dp = function (index) {
    if (index >= keys.length) return 0;
    if (memo[index] !== -1) return memo[index];

    let earn = numsObj[keys[index]] + dp(index + 2);
    let del = dp(index + 1);

    if (keys[index] + 1 !== keys[index + 1]) del += numsObj[keys[index]];

    memo[index] = Math.max(earn, del);

    return memo[index];
  };

  return dp(0);
};
