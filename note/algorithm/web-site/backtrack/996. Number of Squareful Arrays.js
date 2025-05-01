/**
 * @param {number[]} nums
 * @return {number}
 */
var numSquarefulPerms = function (nums) {
  const track = [];
  const used = new Array(nums.length).fill(0);
  let res = 0;

  nums.sort((a, b) => a - b);

  const backtrack = () => {
    if (track.length === nums.length) {
      res += 1;
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) continue;

      if (i > 0 && nums[i - 1] === nums[i] && !used[i - 1]) continue;

      const c = Math.sqrt(track[track.length - 1] + nums[i]);
      if (track.length > 0 && c !== Math.floor(c)) continue;

      used[i] = 1;

      track.push(nums[i]);
      backtrack();

      track.pop();
      used[i] = 0;
    }
  };

  backtrack();

  return res;
};
