/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
var findRotateSteps = function (ring, key) {
  const m = ring.length;
  const n = key.length;

  const charToIndex = new Map();
  const memo = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    let c = ring.charAt(i);
    if (!charToIndex.has(c)) {
      charToIndex.set(c, []);
    }
    charToIndex.get(c).push(i);
  }

  const dp = (i, j) => {
    if (j === n) return 0;
    if (memo[i][j] !== 0) return memo[i][j];

    let res = Infinity;

    for (let k of charToIndex.get(key[j])) {
      let delta = Math.abs(k - i);

      delta = Math.min(delta, m - delta);

      const subProblem = dp(k, j + 1);

      res = Math.min(res, 1 + delta + subProblem);
    }

    memo[i][j] = res;

    return res;
  };

  return dp(0, 0);
};
