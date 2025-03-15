/**
 * @param {number[]} hours
 * @return {number}
 */
var longestWPI = function (hours) {
  const n = hours.length;
  const preSum = [0];
  for (let i = 1; i <= n; i += 1) {
    preSum[i] = preSum[i - 1] + (hours[i - 1] > 8 ? 1 : -1);
  }

  let res = 0;
  const tiringMap = new Map();

  for (let i = 1; i < preSum.length; i += 1) {
    if (!tiringMap.has(preSum[i])) tiringMap.set(preSum[i], i);

    if (preSum[i] > 0) res = Math.max(res, i);
    else if (tiringMap.has(preSum[i] - 1)) {
      res = Math.max(res, i - tiringMap.get(preSum[i] - 1));
    }
  }

  return res;
};
