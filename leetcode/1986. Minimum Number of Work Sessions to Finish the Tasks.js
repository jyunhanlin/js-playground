/**
 * @param {number[]} tasks
 * @param {number} sessionTime
 * @return {number}
 */
var minSessions = function (tasks, sessionTime) {
  const n = tasks.length;
  const dp = {};

  const helper = (mask, time) => {
    if (mask === (1 << n) - 1) return 1;

    const key = `${mask}-${time}`;
    if (dp[key]) return dp[key];

    let min = Infinity;
    for (let i = 0; i < n; i += 1) {
      if (mask & (1 << i)) continue;

      if (time >= tasks[i]) {
        min = Math.min(min, helper(mask | (1 << i), time - tasks[i]));
      } else {
        min = Math.min(min, helper(mask | (1 << i), sessionTime - tasks[i]) + 1);
      }
    }

    dp[key] = min;
    return min;
  };

  return helper(0, sessionTime);
};
