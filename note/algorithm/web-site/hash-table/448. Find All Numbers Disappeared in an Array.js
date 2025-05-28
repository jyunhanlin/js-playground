/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const n = nums.length;
  const count = new Array(n).fill(0);

  for (const num of nums) {
    count[num - 1] = 1;
  }

  const res = [];
  for (let num = 0; num < n; num++) {
    if (count[num] === 0) {
      res.push(num + 1);
    }
  }
  return res;
};
