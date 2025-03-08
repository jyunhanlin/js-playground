/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [];
  const track = new Set();

  const backtrack = () => {
    if (track.size === nums.length) {
      res.push([...track]);
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (track.has(nums[i])) continue;

      track.add(nums[i]);

      backtrack();
      track.delete(nums[i]);
    }
  };

  backtrack();

  return res;
};
