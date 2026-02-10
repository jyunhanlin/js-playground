var countNonDecreasingSubseq = function (nums) {
  const n = nums.length;

  let count = 0;
  const track = [];

  const backtrack = (start) => {
    if (track.length > 1) count += 1;

    const used = new Set();

    for (let i = start; i < n; i += 1) {
      if (track.length && nums[i] < track[track.length - 1]) continue;
      if (used.has(nums[i])) continue;

      used.add(nums[i]);
      track.push(nums[i]);
      backtrack(i + 1);
      track.pop();
    }
  };

  backtrack(0);

  return count;
};
