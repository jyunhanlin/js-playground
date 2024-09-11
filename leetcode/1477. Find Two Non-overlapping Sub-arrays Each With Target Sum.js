/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function (arr, target) {
  const n = arr.length;
  const dp = new Array(n).fill(Infinity); // dp[i]: the length of smallest subarray from a[0]...a[i] with sum === target

  let result = Infinity;
  let sum = 0; // sum of current window;
  let leftIndex = 0;

  for (let i = 0; i < n; i += 1) {
    sum += arr[i];

    while (sum > target) {
      sum -= arr[leftIndex];
      leftIndex += 1;
    }

    if (sum === target) {
      const curLen = i - leftIndex + 1;
      result = Math.min(result, curLen + (dp[leftIndex - 1] || Infinity));
      dp[i] = Math.min(curLen, dp[i - 1] || Infinity);
    } else {
      dp[i] = dp[i - 1] || Infinity;
    }
  }

  return result === Infinity ? -1 : result;
};
