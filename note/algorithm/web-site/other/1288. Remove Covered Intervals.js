/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function (intervals) {
  intervals.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });

  let left = intervals[0][0];
  let right = intervals[0][1];

  let res = 0;
  for (let i = 1; i < intervals.length; i += 1) {
    const interval = intervals[i];

    if (left <= interval[0] && interval[1] <= right) {
      res += 1;
    }

    if (left <= interval[0] && right <= interval[1]) {
      right = interval[1];
    }

    if (right < interval[0]) {
      left = interval[0];
      right = interval[1];
    }
  }

  return intervals.length - res;
};
