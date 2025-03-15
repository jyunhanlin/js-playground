/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function (grid, k) {
  const arr = grid.flat();
  const len = grid[0].length;

  while (k) {
    const last = arr.pop();
    arr.unshift(last);
    k -= 1;
  }

  const res = [];

  while (arr.length) {
    res.push(arr.splice(0, len));
  }

  return res;
};
