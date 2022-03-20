/**
 * @param {number} n
 * @return {number}
 */

const mem = {};
var fib = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (mem[n]) return mem[n];

  mem[n] = fib(n - 1) + fib(n - 2);

  return mem[n];
};
