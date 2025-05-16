/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function (startTime, endTime, profit) {
  const n = profit.length;
  const jobs = Array.from({ length: n }, (_, i) => [startTime[i], endTime[i], profit[i]]);

  // sort by end time
  jobs.sort((a, b) => a[1] - b[1]);

  const dp = [];
  dp.push([0, 0]);

  for (const [begin, end, value] of jobs) {
    let left = 0;
    let right = dp.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2);
      if (dp[mid][0] <= begin) left = mid;
      else right = mid - 1;
    }

    const curProfit = dp[left][1] + value;
    if (curProfit > dp[dp.length - 1][1]) dp.push([end, curProfit]);
  }

  return dp[dp.length - 1][1];
};
