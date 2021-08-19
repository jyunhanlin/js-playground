/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const starts = [];
  const ends = [];

  for (let i = 0; i < intervals.length; i += 1) {
    starts.push(intervals[i][0]);
    ends.push(intervals[i][1]);
  }

  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);

  const results = [[starts.shift(), ends.shift()]];

  while (starts.length || ends.length) {
    if (starts.length) {
      const start = starts.shift();

      const lastResultEnd = results[results.length - 1][1];

      if (start <= lastResultEnd) {
        const end = ends.shift();
        results[results.length - 1][1] = end;
      } else {
        const end = ends.shift();

        if (start <= end) results.push([start, end]);
        else {
          results[results.length - 1][1] = end;

          const nextEnd = ends.shift();

          results.push([start, nextEnd]);
        }
      }
    } else {
      results[results.length - 1][1] = ends[ends.length - 1][1];
    }
  }

  return results;
};

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [intervals[0]];

  for (let i = 1; i < intervals.length; i += 1) {
    const currentInterval = intervals[i];
    const lastInterval = res[res.length - 1];

    if (currentInterval[0] <= lastInterval[1]) {
      lastInterval[1] = Math.max(lastInterval[1], currentInterval[1]);
    } else {
      res.push(currentInterval);
    }
  }

  return res;
};
