/**
 * @param {number} num
 * @param {number} k
 * @return {number}
 */
var minimumNumbers = function (num, k) {
  const arrK = [];
  const dp = new Array(num + 1).fill(Infinity);

  for (let i = 0; i <= num; i += 1) {
    if (i % 10 === k) arrK.push(i);
  }

  dp[0] = 0;

  for (let i = 0; i <= num; i += 1) {
    for (let j = 0; j < arrK.length; j += 1) {
      if (arrK[j] <= i && dp[i - arrK[j]] !== Infinity)
        dp[i] = Math.min(dp[i], dp[i - arrK[j]] + 1);
    }
  }

  return dp[num] === Infinity ? -1 : dp[num];
};
