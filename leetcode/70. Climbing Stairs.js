/**
 * @param {number} n
 * @return {number}
 */
const mem = {};

var climbStairs = function (n) {
  if (n === 1) return 1;
  if (n === 2) return 2;

  if (mem[n]) return mem[n];

  mem[n] = climbStairs(n - 2) + climbStairs(n - 1);

  return mem[n];
};
