// quickPow: Fast exponentiation algorithm (a^b mod k)
// Computes (a^b) % k efficiently using binary exponentiation.
// a: base, b: exponent, k: modulus
// Time complexity: O(log b)
function quickPow(a, b, k) {
  let res = 1; // Variable to store the result

  a = a % k; // Reduce a modulo k to keep values small
  while (b > 0) {
    // Iterate while exponent b is positive
    if ((b & 1) === 1) {
      // If the current bit of b is set (b is odd)
      res = (res * a) % k; // Multiply result by a and take modulo k
    }
    a = (a * a) % k; // Square a and reduce modulo k
    b = b >> 1; // Right-shift b to process the next bit
  }
  return res; // Return the computed result
}
