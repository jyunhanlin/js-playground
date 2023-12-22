/**
 * @param {string} s
 * @return {number}
 */
var minimumCost = function (s) {
  const n = s.length;
  let cost = 0;
  for (let i = 0; i < n - 1; i++) {
    if (s[i] != s[i + 1]) {
      const invertLeft = i + 1;
      const invertRight = n - i - 1;

      cost += Math.min(invertLeft, invertRight);
    }
  }
  return cost;
};
