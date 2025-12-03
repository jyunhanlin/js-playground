/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  if (points.length === 0) return 0;

  points.sort((a, b) => a[1] - b[1]);
  let count = 1;
  let xEnd = points[0][1];

  for (const [start, end] of points) {
    if (start > xEnd) {
      count += 1;
      xEnd = end;
    }
  }

  return count;
};

// time complexity: O(n log n)
// space complexity: O(1)
