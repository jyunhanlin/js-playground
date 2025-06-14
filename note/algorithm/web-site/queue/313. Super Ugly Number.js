/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
var nthSuperUglyNumber = function (n, primes) {
  const pq = new MinPriorityQueue((a) => a[0]);
  const ugly = new Array(n + 1).fill(0);

  for (let i = 0; i < primes.length; i += 1) {
    // [product, prime, index]
    pq.enqueue([1, primes[i], 1]);
  }

  let p = 1;

  while (p <= n) {
    const [product, prime, index] = pq.dequeue();

    if (product !== ugly[p - 1]) {
      ugly[p] = product;
      p += 1;
    }

    pq.enqueue([ugly[index] * prime, prime, index + 1]);
  }

  return ugly[n];
};
