// Time Limit Exceeded
/**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function (arr) {
  const MOD = 1e9 + 7;
  let sum = 0;

  for (let i = 0; i < arr.length; i += 1) {
    let curMin = Infinity;
    for (let j = i; j < arr.length; j += 1) {
      curMin = Math.min(curMin, arr[j]);

      sum = (sum + curMin) % MOD;
    }
  }

  return sum;
};
