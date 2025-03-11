/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  const isPrime = new Array(n).fill(1);

  for (let i = 2; i < Math.sqrt(n); i += 1) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = 0;
      }
    }
  }

  let count = 0;
  for (let i = 2; i < n; i += 1) {
    if (isPrime[i]) count += 1;
  }

  return count;
};
