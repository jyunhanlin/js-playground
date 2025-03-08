/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);

  const res = [];
  const track = [];

  const backtrack = (start, sum) => {
    if (sum === target) {
      res.push([...track]);
      return;
    }

    if (sum > target) return;

    for (let i = start; i < candidates.length; i += 1) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;

      track.push(candidates[i]);
      backtrack(i + 1, sum + candidates[i]);
      track.pop();
    }
  };

  backtrack(0, 0);

  return res;
};
