/**
 * @param {number} n
 * @param {number[]} cost
 * @return {number}
 */
var minIncrements = function (n, cost) {
  let res = 0;

  const dfs = (i) => {
    if (i >= cost.length) return 0;
    const a = dfs(2 * i + 1);
    const b = dfs(2 * i + 2);

    res += Math.abs(a - b);

    return cost[i] + Math.max(a, b);
  };

  dfs(0);

  return res;
};
