/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const res = [];
  const track = new Set();

  const backtrack = (start) => {
    if (track.size === k) {
      res.push([...track]);
      return;
    }

    for (let i = start; i <= n; i += 1) {
      track.add(i);
      backtrack(i + 1);
      track.delete(i);
    }
  };

  backtrack(1);

  return res;
};
