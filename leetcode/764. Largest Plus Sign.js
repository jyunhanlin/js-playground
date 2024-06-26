/**
 * @param {number} n
 * @param {number[][]} mines
 * @return {number}
 */
var orderOfLargestPlusSign = function (n, mines) {
  // create n * n as a table, and each grid fill the maximum number
  const t = new Array(n).fill(0).map(() => new Array(n).fill(n));

  // insert `0` to the grid in table according the position in mines
  mines.forEach((a) => (t[a[0]][a[1]] = 0));

  // loop each rows and cols
  // - for rows: calculate non-zero grid from left to right
  // - for cols: calculate non-zero grid from top to bottom
  // - when the loop is completed, all of non-zero values will be calculated by four directions
  // - and these grids value will be updated by comparing. then we can obtain the minimum value of the four directions calculation, which is the maximum of the grid
  for (let i = 0; i < n; i++) {
    // save the maximum value of non-zeros with for directions
    let [l, r, u, d] = [0, 0, 0, 0];

    // l: left,  loop row i from left to right
    // r: right, loop row i from right to left
    // u: up,    loop col i from top to bottom
    // d: down,  loop col i from bottom to top
    for (let j = 0, k = n - 1; j < n; j++, k--) {
      // if the value is `0`, then set variable to `0`, and indicates it's broken
      l = t[i][j] && l + 1;
      r = t[i][k] && r + 1;
      u = t[j][i] && u + 1;
      d = t[k][i] && d + 1;

      // if current value is less than origin value
      // one possibility: the origin value is default
      // another possibility: the length of non-zero in a certain direction is langer than in the current direction, which the minimum value we need
      t[i][j] = Math.min(t[i][j], l);
      t[i][k] = Math.min(t[i][k], r);
      t[j][i] = Math.min(t[j][i], u);
      t[k][i] = Math.min(t[k][i], d);
    }
  }

  let res = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res = Math.max(res, t[i][j]);
    }
  }

  return res;
};
