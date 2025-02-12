/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteRepeat = function (nums) {
  const res = [];
  const track = [];

  const backtrack = () => {
    if (track.length === nums.length) {
      res.push([...track]);
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      track.push(nums[i]);
      backtrack();
      track.pop();
    }
  };

  backtrack();

  return res;
};
