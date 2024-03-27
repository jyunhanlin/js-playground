/**
 * @param {number[]} arr
 * @return {number}
 */
var lenLongestFibSubseq = function (arr) {
  const dp = {};

  for (let i = 0; i < arr.length; i += 1) {
    dp[arr[i]] = {};
  }

  let result = 0;

  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      const start = arr[i];
      const end = arr[j];
      const next = start + end;

      dp[end][next] = (dp[start][end] || 1) + 1;

      result = Math.max(result, dp[end][next]);
    }
  }

  return result < 3 ? 0 : result;
};

// Time Limit Exceeded
/**
 * @param {number[]} arr
 * @return {number}
 */
var lenLongestFibSubseq = function (arr) {
  const dp = {};

  for (let i = 0; i < arr.length; i += 1) {
    dp[arr[i]] = i;
  }

  let result = 0;

  for (let i = 0; i < arr.length - 2; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      let cur = 2;
      let first = i;
      let second = j;

      while (second < arr.length) {
        const next = arr[first] + arr[second];

        if (dp[next]) {
          first = second;
          second = dp[next];
          cur += 1;
        } else {
          second += 1;
          cur = 2;
        }

        result = Math.max(result, cur);
      }
    }
  }

  return result < 3 ? 0 : result;
};
