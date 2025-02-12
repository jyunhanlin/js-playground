/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];

  const track = new Set();

  const backtrack = (start) => {
    res.push([...track]);

    for (let i = start; i < nums.length; i += 1) {
      track.add(nums[i]);

      backtrack(i + 1);

      track.delete(nums[i]);
    }
  };

  backtrack(0);

  return res;
};
