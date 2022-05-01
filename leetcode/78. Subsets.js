/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = [];

  const backtracking = (arr, cur) => {
    result.push(cur);

    for (let i = 0; i < arr.length; i += 1) {
      const newCur = [...cur, arr[i]];
      const newArr = arr.filter((_, idx) => idx > i);
      backtracking(newArr, newCur);
    }
  };

  backtracking(nums, []);

  return result;
};
