/**
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function (intervals) {
  // sort by end point, if end point is the same, sort by start point in descending order
  // because we want to cover the most intervals with the least points
  intervals.sort((a, b) => (a[1] === b[1] ? b[0] - a[0] : a[1] - b[1]));

  let result = 0;
  let first = -1;
  let second = -1;

  for (let [start, end] of intervals) {
    let firstIn = first >= start;
    let secondIn = second >= start;

    if (firstIn && secondIn) continue;

    if (!firstIn && !secondIn) {
      result += 2;
      first = end - 1;
      second = end;
    } else {
      result += 1;
      first = second;
      second = end;
    }
  }

  return result;
};
