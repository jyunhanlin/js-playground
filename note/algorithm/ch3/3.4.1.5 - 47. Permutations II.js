/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const res = [];
  const track = [];
  const used = {};

  const backtrack = () => {
    if (track.length === n) {
      res.push([...track]);
      return;
    }

    for (let i = 0; i < n; i += 1) {
      if (used[i]) continue;

      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      track.push(nums[i]);
      used[i] = 1;
      backtrack();
      track.pop();
      used[i] = 0;
    }
  };

  backtrack();

  return res;
};
