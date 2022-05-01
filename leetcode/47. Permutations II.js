/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const result = new Set();

  const backtracking = (arr, cur) => {
    if (cur.length === nums.length) {
      result.add(JSON.stringify(cur));
    } else {
      for (let i = 0; i < arr.length; i += 1) {
        const newCur = [...cur, arr[i]];
        const newArr = arr.filter((_, idx) => idx !== i);

        backtracking(newArr, newCur);
      }
    }
  };

  backtracking(nums, []);

  return [...result].map((n) => JSON.parse(n));
};
