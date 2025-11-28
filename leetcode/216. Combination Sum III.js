/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  const res = [];
  const track = [];
  const used = Array(10).fill(0);

  const backtrack = (start, sum) => {
    if (sum > n || track.length > k) return;

    if (track.length === k && sum === n) {
      res.push([...track]);
      return;
    }

    for (let i = start; i < 10; i += 1) {
      if (used[i]) continue;

      used[i] = 1;
      track.push(i);
      backtrack(i, sum + i);
      used[i] = 0;
      track.pop();
    }
  };

  backtrack(1, 0);

  return res;
};

// time complexity: O(k * C(9, k))
// space complexity: O(k)
