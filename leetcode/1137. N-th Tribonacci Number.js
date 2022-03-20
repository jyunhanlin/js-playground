/**
 * @param {number} n
 * @return {number}
 */

const mem = {};

var tribonacci = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 1;

  if (mem[n]) return mem[n];

  mem[n] = tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);

  return mem[n];
};
