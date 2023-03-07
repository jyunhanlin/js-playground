/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function (nums) {
  const helper = (left, right) => {
    if (left === right) return nums[left];

    const res = Math.max(
      nums[left] - helper(left + 1, right),
      nums[right] - helper(left, right - 1)
    );
    return res;
  };

  return helper(0, nums.length - 1) >= 0;
};

var PredictTheWinner = function (nums) {
  const dp = new Map();

  const helper = (left, right) => {
    const key = `${left}-${right}`;
    if (dp.has(key)) return dp.get(key);

    if (left === right) return nums[left];

    const res = Math.max(
      nums[left] - helper(left + 1, right),
      nums[right] - helper(left, right - 1)
    );
    dp.set(key, res);
    return res;
  };

  return helper(0, nums.length - 1) >= 0;
};
