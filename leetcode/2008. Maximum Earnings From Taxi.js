/**
 * @param {number} n
 * @param {number[][]} rides
 * @return {number}
 */
var maxTaxiEarnings = function (n, rides) {
  const dp = new Array(n + 1).fill(0);

  rides.sort((ride1, ride2) => ride1[1] - ride2[1]);

  let j = 0;
  for (let i = 1; i <= n; i += 1) {
    dp[i] = dp[i - 1];

    while (j < rides.length && rides[j][1] === i) {
      const ride = rides[j];
      const start = ride[0];
      const end = ride[1];
      const tip = ride[2];
      const earn = end - start + tip;

      dp[i] = Math.max(dp[i], dp[start] + earn);

      j += 1;
    }
  }

  return dp[n];
};

// Time Limit Exceeded
/**
 * @param {number} n
 * @param {number[][]} rides
 * @return {number}
 */
var maxTaxiEarnings = function (n, rides) {
  const dp = new Array(n + 1).fill(0);

  rides.sort((ride1, ride2) => ride1[1] - ride2[1]);

  for (let i = 0; i < rides.length; i += 1) {
    const ride = rides[i];
    const start = ride[0];
    const end = ride[1];
    const tip = ride[2];
    const earn = end - start + tip;

    const maxStart = Math.max(...dp.slice(0, start + 1));
    dp[end] = Math.max(dp[end], maxStart + earn);
  }

  return Math.max(...dp);
};
