/**
 * @param {number[]} arr
 * @return {number}
 */
var maximumSum = function (arr) {
  const n = arr.length;
  const dp1 = new Array(n).fill(-Infinity);
  const dp2 = new Array(n).fill(-Infinity);

  dp1[0] = arr[0];
  dp2[0] = 0;

  let max = arr[0];
  for (let i = 1; i < n; i += 1) {
    dp1[i] = Math.max(dp1[i - 1] + arr[i], arr[i]);
    dp2[i] = Math.max(dp1[i - 1], dp2[i - 1] + arr[i]);

    max = Math.max(max, dp1[i], dp2[i]);
  }

  console.log(dp1, dp2);

  return max;
};
