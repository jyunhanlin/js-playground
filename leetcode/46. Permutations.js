/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = [];

  const backtracking = (cur, remainingNums) => {
    if (cur.length === nums.length) {
      result.push(cur);
      return;
    }

    for (let i = 0; i < remainingNums.length; i += 1) {
      const newCur = [...cur, remainingNums[i]];
      const newRemainingNums = remainingNums.filter((_, idx) => idx !== i);

      backtracking(newCur, newRemainingNums);
    }
  };
  backtracking([], nums);

  return result;
};
