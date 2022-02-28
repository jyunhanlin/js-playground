/**
 * // This is the CustomFunction's API interface.
 * // You should not implement it, or speculate about its implementation
 * function CustomFunction() {
 *     @param {integer, integer} x, y
 *     @return {integer}
 *     this.f = function(x, y) {
 *         ...
 *     };
 * };
 */

/**
 * @param {CustomFunction} customfunction
 * @param {integer} z
 * @return {integer[][]}
 */
var findSolution = function (customfunction, z) {
  const res = [];

  let i = 1;
  let j = z;
  while (i <= z && i !== 0 && j !== 0) {
    const cur = customfunction.f(i, j);

    if (cur === z) {
      res.push([i, j]);
      i += 1;
      j -= 1;
    } else if (cur > z) j -= 1;
    else if (cur < z) i += 1;
  }

  return res;
};
