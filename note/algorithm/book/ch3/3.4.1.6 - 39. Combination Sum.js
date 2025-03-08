/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const res = [];
  const track = [];

  const backtrack = (start, sum) => {
    if (sum > target) return;
    if (sum === target) {
      res.push([...track]);
      return;
    }

    for (let i = start; i < candidates.length; i += 1) {
      track.push(candidates[i]);
      backtrack(i, sum + candidates[i]);
      track.pop();
    }
  };

  backtrack(0, 0);

  return res;
};
