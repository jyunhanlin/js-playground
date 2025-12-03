// quickPow: Fast exponentiation algorithm (a^b mod k)
// Computes (a^b) % k efficiently using binary exponentiation.
// a: base, b: exponent, k: modulus

// a ^ b
// if b is odd, a ^ b = a * a ^ (b - 1)
// if b is even, a ^ b = (a * a) ^ (b / 2)

function quickPow(a, b, k) {
  let res = 1;

  // avoid a is large than k
  a = a % k;
  while (b > 0) {
    // if b is odd
    if ((b & 1) === 1) {
      res = (res * a) % k;
    }
    a = (a * a) % k;
    // right shift 1 means divide by 2
    b = b >> 1;
  }
  return res;
}

// time complexity: O(log b)
