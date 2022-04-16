/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const result = [];

  const backtracking = (cur, curIdx) => {
    if (cur.length === k) {
      result.push(cur);
      return;
    }

    for (let i = curIdx; i <= n; i += 1) {
      const newCur = [...cur, i];

      backtracking(newCur, i + 1);
    }
  };

  backtracking([], 1);

  return result;
};
