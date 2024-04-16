/**
 * @param {number[]} arr
 * @return {number}
 */
var maxTurbulenceSize = function (arr) {
  let max = 1;
  const dp = new Array(arr.length).fill().map(() => new Array(2).fill(1));

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i - 1] > arr[i]) {
      dp[i][1] = dp[i - 1][0] + 1;
    } else if (arr[i - 1] < arr[i]) {
      dp[i][0] = dp[i - 1][1] + 1;
    }

    max = Math.max(max, dp[i][0], dp[i][1]);
  }

  return max;
};
