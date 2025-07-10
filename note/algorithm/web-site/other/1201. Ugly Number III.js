/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var nthUglyNumber = function (n, a, b, c) {
  const gcd = (a, b) => {
    if (a < b) return gcd(b, a);
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a, b) => (a * b) / gcd(a, b);

  const f = (num) => {
    const setA = Math.floor(num / a);
    const setB = Math.floor(num / b);
    const setC = Math.floor(num / c);
    const setAB = Math.floor(num / lcm(a, b));
    const setAC = Math.floor(num / lcm(a, c));
    const setBC = Math.floor(num / lcm(b, c));
    const setABC = Math.floor(num / lcm(lcm(a, b), c));
    // A + B + C - A ∩ B - A ∩ C - B ∩ C + A ∩ B ∩ C
    return setA + setB + setC - setAB - setAC - setBC + setABC;
  };

  let left = 1;
  let right = 2 * 10 ** 9;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (f(mid) < n) left = mid + 1;
    else right = mid - 1;
  }

  return left;
};

// Time Limit Exceeded
/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var nthUglyNumber = function (n, a, b, c) {
  let productA = a;
  let productB = b;
  let productC = c;

  let p = 1;

  let minProduct;

  while (p <= n) {
    minProduct = Math.min(productA, productB, productC);
    p += 1;

    if (minProduct === productA) productA += a;
    if (minProduct === productB) productB += b;
    if (minProduct === productC) productC += c;
  }

  return minProduct;
};
