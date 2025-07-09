/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });

  const res = [intervals[0]];

  for (let i = 1; i < intervals.length; i += 1) {
    const interval = intervals[i];

    const last = res[res.length - 1];

    if (interval[0] <= last[1]) {
      last[1] = Math.max(interval[1], last[1]);
    } else {
      res.push(interval);
    }
  }

  return res;
};
