/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  const track = [];

  const backtrack = (start) => {
    res.push([...track]);

    for (let i = start; i < nums.length; i += 1) {
      if (i > start && nums[i] === nums[i - 1]) continue;

      track.push(nums[i]);
      backtrack(i + 1);
      track.pop();
    }
  };

  backtrack(0);

  return res;
};
