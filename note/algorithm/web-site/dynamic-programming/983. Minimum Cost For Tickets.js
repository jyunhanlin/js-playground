/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  const n = days.length;
  const memo = {};

  const dp = (index, day) => {
    if (index >= n) return 0;
    if (memo[day]) return memo[day];
    if (day >= days[index]) return dp(index + 1, day);

    memo[day] = Math.min(
      dp(index, days[index]) + costs[0],
      dp(index, days[index] + 6) + costs[1],
      dp(index, days[index] + 29) + costs[2]
    );

    return memo[day];
  };

  return dp(0, 0);
};

/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  const n = days.length;
  const memo = new Array(n).fill(-1);

  const dp = (i) => {
    if (i >= n) return 0;
    if (memo[i] !== -1) return memo[i];

    const currentDay = days[i];
    let nextDayIndex = i;
    while (nextDayIndex < days.length && days[nextDayIndex] < currentDay + 1) {
      nextDayIndex++;
    }
    const day1Cost = dp(nextDayIndex) + costs[0];

    while (nextDayIndex < days.length && days[nextDayIndex] < currentDay + 7) {
      nextDayIndex++;
    }
    const day7Cost = dp(nextDayIndex) + costs[1];

    while (nextDayIndex < days.length && days[nextDayIndex] < currentDay + 30) {
      nextDayIndex++;
    }
    const day30Cost = dp(nextDayIndex) + costs[2];

    memo[i] = Math.min(day1Cost, day7Cost, day30Cost);
    return memo[i];
  };

  return dp(0);
};
