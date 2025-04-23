/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  const res = [];
  const track = [];

  const n = nums.length;

  const backtrack = (index) => {
    if (track.length > 1) {
      res.push([...track]);
    }

    const used = {};

    for (let i = index; i < n; i += 1) {
      if (track.length && track[track.length - 1] > nums[i]) continue;
      if (used[nums[i]]) continue;

      used[nums[i]] = 1;
      track.push(nums[i]);
      backtrack(i + 1);
      track.pop();
    }
  };

  backtrack(0);

  return res;
};
