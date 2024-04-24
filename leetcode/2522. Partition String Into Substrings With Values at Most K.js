/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumPartition = function (s, k) {
  const dp = new Array(s.length).fill(-1);

  for (let i = 0; i < s.length; i += 1) {
    let num = +s[i];

    if (num > k) break;

    dp[i] = 1 + (dp[i - 1] || 0);

    for (let j = i - 1; j >= 0; j -= 1) {
      num = +`${s[j]}${num}`;

      if (num > k) break;
      dp[i] = Math.min(dp[i], 1 + (dp[j - 1] || 0));
    }
  }

  return dp[s.length - 1];
};
