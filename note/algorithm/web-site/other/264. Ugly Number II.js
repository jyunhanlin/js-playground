/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
  let p2 = 1;
  let p3 = 1;
  let p5 = 1;
  let product2 = 1;
  let product3 = 1;
  let product5 = 1;
  const ugly = new Array(n + 1);

  let i = 1;
  while (i <= n) {
    const min = Math.min(product2, product3, product5);
    ugly[i] = min;
    i++;

    if (min === product2) {
      product2 = 2 * ugly[p2];
      p2++;
    }
    if (min === product3) {
      product3 = 3 * ugly[p3];
      p3++;
    }
    if (min === product5) {
      product5 = 5 * ugly[p5];
      p5++;
    }
  }

  return ugly[n];
};

/**
 * @param {number} n
 * @return {number}
 */

var nthUglyNumber = function (n) {
  const pq = new MinPriorityQueue((a) => a[0]);

  pq.enqueue([1, 2, 1]);
  pq.enqueue([1, 3, 1]);
  pq.enqueue([1, 5, 1]);

  const ugly = new Array(n + 1);
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
